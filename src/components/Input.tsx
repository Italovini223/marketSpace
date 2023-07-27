import { Input as NativeBaseInput, IInputProps, Icon } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

type Props = IInputProps & {
  haveIcon?: boolean;
  IconName?:string;
  onPress?: () => void;
  variant: 'white' | 'gray';
}

export function Input({haveIcon, IconName, onPress, variant, ...rest}:Props){
  return (
    <NativeBaseInput
      bg={variant == 'gray' ? 'gray.100' : 'white'}
      h={12}
      borderRadius={10}
      fontSize="md"
      color="gray.400"
      fontFamily="body"
      mb={4}
      px={4}
      borderWidth={0}
      InputRightElement={
        haveIcon == true ?
        <TouchableOpacity
          onPress={onPress}
        >
          <Icon 
            as={MaterialIcons}
            name={IconName}
            size={6}
            color="gray.700"
            marginRight={4}
          />
        </TouchableOpacity>
        :
        undefined
      }
      {...rest}
    >

        <TouchableOpacity
          onPress={onPress}
        >
          <Icon 
            as={MaterialIcons}
            name="logout"
            size={10}
            color="gray.700"
          />
        </TouchableOpacity>

    </NativeBaseInput>
  )
}
