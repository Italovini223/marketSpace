import { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { ScrollView, VStack, Image, Text, Center, Box, useToast } from 'native-base'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm, Controller } from 'react-hook-form'

import * as ImagePicker from 'expo-image-picker'
 

import * as FileSystem from 'expo-file-system'

import { api } from '@services/api'

import { AppError } from '@utils/appError'

import { useAuth } from '@hooks/useAuth'

import { FileInfo } from 'expo-file-system'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import LogoImg from '@assets/logo.png'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Platform } from 'react-native'
import { UserPhotoSelector } from '@components/UserPhotoSelector'


type formDataProps = {
  name: string,
  email: string;
  tel: string;
  password: string;
  passwordConfirm: string;
}
const phoneNumberRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
const singUpSchema = yup.object({
  name: yup.string().required('Informe o seu nome'),
  email: yup.string().required('Informe o email').email('Digite um email valido'),
  tel: yup.string().required('Informe o seu numero de telefone').matches(phoneNumberRegex, 'Numero invalido'),
  password: yup.string().required('Informe uma senha').min(6, 'A senha deve conter no mínimo seis dígitos'),
  passwordConfirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'Digite a mesma senha')
})

export function SingUp(){
  const [isLoading, setIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState<string>()
  const [avatar, setAvatar] = useState<any>({} as any)
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [isSecurityTextAtivePassword, setIsSecurityTextAtivePassword] = useState(true)
  const [isSecurityTextAtivePasswordConfirm, setIsSecurityTextAtivePasswordConfirm] = useState(true)

  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { singIn } = useAuth()
  const toast = useToast()

  const { control, handleSubmit, formState:{errors} } = useForm<formDataProps>({
    resolver: yupResolver(singUpSchema)
  })

  function handleSingIn(){
    navigation.navigate('singIn')
  }

  async function handleUserPhotoSelect(){
    try {
      setPhotoIsLoading(true)


      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })
  
      if(photoSelected.canceled){
        return;
      }
      
      const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri, { size: true}) as FileInfo
      if(photoInfo.exists && (photoInfo.size /1024 /1024) > 5){
        toast.show({
          title: 'Essa imagem e muito grande. Escolha uma ate 5MB',
          placement: 'top',
          bgColor: 'red.500'
        })

        return
      }

      const fileExtension = photoSelected.assets[0].uri.split('.').pop()

      const photoFile = {
        name: `profile_picture.${fileExtension}`,
        uri: photoSelected.assets[0].uri,
        type: `${photoSelected.assets[0].type}/${fileExtension}`
      } as any

      setAvatar(photoFile);
      
      setUserPhoto(photoSelected.assets[0].uri)
    } catch (error) {
        console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleSingUp({ name, email, password, tel }:formDataProps){
    try{
      setIsLoading(true)

      const userUploadForm = new FormData()
      userUploadForm.append('avatar', avatar)
      userUploadForm.append('name', name)
      userUploadForm.append('email', email)
      userUploadForm.append('password', password)
      userUploadForm.append('tel', tel)

      await api.post('/users', userUploadForm)

      toast.show({
        title: 'usuário criado com sucesso',
        placement: 'top',
        bgColor: 'success.500'
      })

      await singIn(email, password)

    } catch (error){
      setIsLoading(false)

      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Nao foi possível criar a conta'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
      
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <ScrollView 
      bg="gray.200" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
    >
      <VStack flex={1} pb={Platform.OS === 'ios' ? 40 : 16} px={8}>
        <VStack alignItems="center" my={10} w="full">
          
          <Image 
            source={LogoImg}
            alt='Logo marketSpace'
            
          />
          <Center flex={1} alignItems="center"  justifyContent="center" mx={10}>
            <Text fontFamily="heading" fontSize="lg" my={2} color="gray.700">Boas vindas!</Text>
            <Text fontFamily="body" fontSize="sm" color="gray.600" textAlign="center">
            Crie sua conta e use o espaço para comprar  itens variados e vender seus produtos
            </Text>
          </Center>
        </VStack>

        <Box w="full" alignItems="center" justifyContent="center" mb={6}>
        <UserPhotoSelector 
          photoUri={userPhoto ? userPhoto : undefined}
          alt='foto do usuário'
          isLoading={photoIsLoading}
          onPress={handleUserPhotoSelect}
        />

        </Box>



        <VStack >
          <Controller 
            name='name'
            control={control}
            render={({ field: {onChange, value }}) => (
              <Input 
                placeholder='Nome'
                variant="white"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller 
            name='email'
            control={control}
            render={({ field: { onChange, value }}) => (
              <Input 
                placeholder='Email'
                variant="white"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller 
            name='tel'
            control={control}
            render={({ field: { onChange, value }}) => (
              <Input 
                placeholder='Telefone'
                variant="white"
                keyboardType="number-pad"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.tel?.message}
              />
            )}
          />
          
          <Controller 
            name='password'
            control={control}
            render={({ field: { onChange, value}}) => (
              <Input 
                placeholder='Senha'
                variant="white"
                secureTextEntry={isSecurityTextAtivePassword}
                haveIcon
                IconName={isSecurityTextAtivePassword ? 'visibility' : 'visibility-off'}
                onPress={() => setIsSecurityTextAtivePassword(!isSecurityTextAtivePassword)}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />  
          <Controller 
            name='passwordConfirm'
            control={control}
            render={({ field: { onChange, value }}) => (
              <Input 
                placeholder='Confirmar senha'
                variant="white"
                secureTextEntry={isSecurityTextAtivePasswordConfirm}
                haveIcon
                IconName={isSecurityTextAtivePasswordConfirm ? 'visibility' : 'visibility-off'}
                onPress={() => setIsSecurityTextAtivePasswordConfirm(!isSecurityTextAtivePasswordConfirm)}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.passwordConfirm?.message}
                onSubmitEditing={handleSubmit(handleSingUp)}
                returnKeyType='send'
              />
            )}
        />

          <Button 
            title='Criar'
            variant="ghost"
            onPress={handleSubmit(handleSingUp)}
            isLoading={isLoading}
            mt={6}
          />
        </VStack>

        <VStack alignItems="center" mt={12}>
          <Text fontFamily="body" fontSize="sm" color="gray.600">
            Já tem uma conta?
          </Text>
          <Button 
            title='Ir para o login'
            my={4}
            onPress={handleSingIn}
          />
        </VStack>
      </VStack>
    </ScrollView>
  )
}