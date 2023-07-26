import { useNavigation } from '@react-navigation/native'

import { VStack, Image, Text, Center, ScrollView} from 'native-base'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import LogoImg from '@assets/logo.png'

export function SingIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function HandleNewAccount(){
    navigation.navigate('singUp')
  }

  return (
    <ScrollView flex={1} w="full">
      <VStack roundedBottom="xl" bg="gray.200">
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
          <Input 
            placeholder='E-mail'
          />

          <Input
            placeholder='Senha'
          />

          <Button title='Entrar' variant="outline"/>
        </Center>

      </VStack>

      <VStack bg="gray.100">
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

    </ScrollView>
  );
}
