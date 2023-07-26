import { HStack, VStack, Text, Heading, Button } from "native-base";
import { TouchableOpacity } from 'react-native'
import { UserPhoto } from "./UserPhoto";

export function HomeHeader(){
  return (
    <HStack bg="gray.100" pt={8} pb={8} alignItems="center">
      <UserPhoto 
        size={10}
        source={{uri: "https://github.com/italovini223.png"}}
        alt="Imagem do usuário"
        mr={4}
      />
      <VStack  flex={1}>
        <Text color="gray.700" fontSize="md">
          Boas vindas,
        </Text>
        <Heading color="gray.700" fontSize="md" fontFamily="heading">
          Ítalo!
        </Heading>
      </VStack>

      <Button
        bg="gray.700"
        _pressed={{
          bg: "gray.600"
        }}
      >
        <Text color="gray.100" fontSize="sm" fontFamily="heading">
          Criar Anuncio
        </Text>
      </Button>

    </HStack>
  )
}