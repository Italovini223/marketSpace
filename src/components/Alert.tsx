import { HStack, Text, IconButton, CloseIcon, Icon, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { AppNavigatorRoutesProps} from '@routes/app.routes'

import { useNavigation } from '@react-navigation/native';


type props = {
  handleOnPress: () => void;
}

export function Alert({ handleOnPress }: props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handlePreView(){
    navigation.navigate('preView')
  }

  return (
    <Pressable
      w="full" 
      p={4} 
      pt={12}
      bgColor="blue.500"
      position="absolute"
      top={0}
      onPress={handlePreView}
    >
      <HStack 
        justifyContent="space-between" 
        alignItems="center" 
      >
          <Icon as={Ionicons} name="notifications-outline" size={5} color="white" mr={2}/>
  
          <Text fontSize="md" color="white" flex={1} textAlign="center">
            Voce tem um produto pendente a ser postado
          </Text>
  
        <IconButton 
          variant="unstyled" 
          _focus={{ borderWidth: 0 }} 
          icon={<CloseIcon size="3" />} 
          _icon={{ color: "white"}} 
          color="black"
          onPress={handleOnPress}
        />
      </HStack>
        
    </Pressable>
  );
}