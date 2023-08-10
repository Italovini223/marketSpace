import { HStack, Heading, VStack, Text, Icon } from "native-base";
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

type props = {
  myProducts: number;
}

export function ActiveAds({ myProducts }: props){
  return(
    <HStack w="full" h={16} bg="blue.100"  alignItems="center" mt={2} px={5} borderRadius={4}>
      <Icon 
        as={MaterialIcons}
        name="local-offer"
        size={6}
        mr={4}
        color="blue.700"
      />
      <VStack color="gray.700" flex={1} >
        <Heading fontSize="lg" fontFamily="heading">
          {myProducts}
        </Heading>
        <Text fontSize="xs" fontFamily="body">
          anúncios ativos
        </Text>
      </VStack>

      <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text color="blue.700" fontFamily="heading" fontSize="xs" alignItems="center">
          Meus anúncios
        </Text>
        <Icon 
          as={MaterialIcons}
          name="arrow-right-alt"
          color="blue.700"
          size={4}
        />
      </TouchableOpacity>
    </HStack>
  )
}