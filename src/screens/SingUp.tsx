import { useNavigation } from '@react-navigation/native'
import { ScrollView, VStack, Image, Text, Center, Box } from 'native-base'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm, Controller } from 'react-hook-form'


import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import LogoImg from '@assets/logo.png'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Platform } from 'react-native'
import { UserPhotoSelector } from '@components/UserPhotoSelector'

type formDataProps = {
  name: string,
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
}

export function SingUp(){
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const phoneNumberRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/

  const singUpSchema = yup.object({
    name: yup.string().required('Informe o seu nome'),
    email: yup.string().required('Informe o email').email('Digite um email valido'),
    phoneNumber: yup.string().required('Informe o seu numero de telefone').matches(phoneNumberRegex, 'Numero invalido'),
    password: yup.string().required('Informe uma senha').min(6, 'A senha deve conter no mínimo seis dígitos'),
    passwordConfirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'Digite a mesma senha')
  })

  const { control, handleSubmit, formState:{errors} } = useForm<formDataProps>({
    resolver: yupResolver(singUpSchema)
  })

  function handleSingIn(){
    navigation.navigate('singIn')
  }

  function handleSingUp({ name, email, password, passwordConfirm, phoneNumber }:formDataProps){

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
          //photoUri='https://github.com/italovini223.png'
          alt='foto do usuário'
          onPress={() => console.log('clicou')}
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
            name='phoneNumber'
            control={control}
            render={({ field: { onChange, value }}) => (
              <Input 
                placeholder='Telefone'
                variant="white"
                keyboardType="number-pad"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.phoneNumber?.message}
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