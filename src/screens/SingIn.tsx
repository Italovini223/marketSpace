import { useNavigation } from '@react-navigation/native'

import { useForm, Controller } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { VStack, Image, Text, Center, ScrollView} from 'native-base'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import LogoImg from '@assets/logo.png'
import { Platform } from 'react-native'

type formDataProps = {
  email: string;
  password: string;
}

export function SingIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const singInSchema = yup.object({
    email: yup.string().required('Informe o email').email('email invalido'),
    password: yup.string().required('Informe a senha')
  })

  const { control, handleSubmit, formState: {errors} } = useForm<formDataProps>({
    resolver: yupResolver(singInSchema)
  })


  function HandleNewAccount(){
    navigation.navigate('singUp')
  }

  function handleSingIn({ email, password }: formDataProps){

  }

  return (
    <VStack flex={1} bgColor="gray.100">
      <ScrollView flex={1} showsVerticalScrollIndicator={false} borderBottomRadius={25} bg="gray.200">
        <VStack pb={Platform.OS === 'ios' ? 32 : 16}>
          <VStack mt={24} alignItems="center">
            <Image
              source={LogoImg}
              alt='Logo do marketspace'
            />
            <Text fontFamily="heading" fontSize="xl" color="gray.700">marketSpace</Text>
            <Text fontFamily="heading" fontSize="sm" color="gray.500">Seu espaço de compra e venda</Text>
          </VStack>

          <Center mt={16} flex={1} px={10}>
            <Text fontFamily="body" fontSize="sm" color="gray.600">Acesse sua conta</Text>
            <Controller 
              control={control}
              name='email'
              render={({ field: { onChange, value }}) => (
                <Input 
                  placeholder='E-mail'
                  variant='white'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller 
              control={control}
              name='password'
              render={({ field: { onChange, value }}) => (
                <Input
                  placeholder='Senha'
                  variant='white'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                  onSubmitEditing={handleSubmit(handleSingIn)}
                  returnKeyType='send'
                />
              )}
            />

            <Button 
              title='Entrar' 
              variant="outline"
              onPress={handleSubmit(handleSingIn)}
            />
          </Center>

        </VStack>
      </ScrollView>
      <VStack>
          <Center mt={10} px={12}>
            <Text fontFamily="body" fontSize="sm" color="gray.600" mb={4}>
              Ainda não tem acesso?
            </Text>
            <Button 
              title='Criar uma conta'
              onPress={HandleNewAccount}
            />
          </Center>
        </VStack>

    </VStack>
  );
}
