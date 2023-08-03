import { Input as NativeBaseInput, IInputProps, Icon, FormControl } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

type Props = IInputProps & {
  haveIcon?: boolean;
  IconName?:string;
  onPress?: () => void;
  variant: 'white' | 'gray';
  errorMessage?: string | null;
}

export function Input({haveIcon = false, IconName, onPress, variant, isInvalid, errorMessage, ...rest}:Props){
  const invalid = !!errorMessage || isInvalid
  return (
    <FormControl 
      isInvalid={invalid}
      mb={4}

    >
      <NativeBaseInput
        bg={variant == 'gray' ? 'gray.100' : 'white'}
        h={12}
        borderRadius={10}
        fontSize="md"
        color="gray.400"
        fontFamily="body"
        px={4}
        borderWidth={0}
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500'
        }}
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
      />

      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>

    </FormControl>
  )
}
