import { useNavigation } from '@react-navigation/native'
import { ScrollView, VStack, Image, Text, Center } from 'native-base'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import LogoImg from '@assets/logo.png'

import { Input } from '@components/Input'
import { Button } from '@components/Button'



export function SingUp(){
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleSingIn(){
    navigation.navigate('singIn')
  }

  return (
    <ScrollView bg="gray.200" showsVerticalScrollIndicator={false} w="ful">
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


      <VStack mx={8}>
        <Input 
          placeholder='Nome'
        />

        <Input 
          placeholder='Email'
        />

        <Input 
          placeholder='Telefone'
        />

        <Input 
          placeholder='Senha'
        />

        <Input 
          placeholder='Confirmar senha'
        />

        <Button 
          title='Criar'
          variant="ghost"
        />
      </VStack>

      <VStack alignItems="center" mx={8}>
        <Text fontFamily="body" fontSize="sm" color="gray.600">
          Já tem uma conta?
        </Text>
        <Button 
          title='Ir para o login'
          my={4}
          onPress={handleSingIn}
        />
      </VStack>
    </ScrollView>
  )
}