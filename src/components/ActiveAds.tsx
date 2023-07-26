import { HStack, Heading, VStack, Text } from "native-base";
import { TouchableOpacity } from 'react-native'

export function ActiveAds(){
  return(
    <HStack w="full" h={16} bg="blue.500"  alignItems="center" px={5} borderRadius={4}>
      <VStack color="gray.700" flex={1} >
        <Heading fontSize="lg" fontFamily="heading">
          4
        </Heading>
        <Text fontSize="xs" fontFamily="body">
          anúncios ativos
        </Text>
      </VStack>

      <TouchableOpacity>
        <Text color="blue.700" fontFamily="heading" fontSize="xs">
          Meus anúncios
        </Text>
      </TouchableOpacity>
    </HStack>
  )
}