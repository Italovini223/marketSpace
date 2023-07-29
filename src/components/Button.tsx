import { Button as NativeBaseButton, IButtonProps, Text, Icon, HStack } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

type props = IButtonProps & {
  title: string;
  variant?: 'outline' | 'ghost';
  haveIcon?: boolean;
  iconName?: string;
}

export function Button({title, variant, haveIcon = false, iconName, ...rest}:props){
  return (
    <NativeBaseButton 
      w="full"
      mb={4}
      h={10}
      bg={ variant === "outline" ? "blue.500" : variant === "ghost" ? "gray.700" : "gray.300"} 
      rounded="sm"
      _pressed={{
        bg: variant === "outline" ? "blue.700" : variant === "ghost" ? 'gray.600' : "gray.200"
      }}
      {...rest}
    >
      <HStack alignItems="center">
        {
          haveIcon &&
          <Icon
            as={MaterialIcons}
            name={iconName}
            size={5}
            borderBottomWidth={1}
            borderColor="white"
            color={ variant === 'outline' || variant === 'ghost' ? 'gray.100' : 'gray.700'}
            mr={2}
          />
        }
        <Text
          fontFamily="body"
          fontSize="sm"
          color={ variant === "outline" ? "gray.100" : variant === "ghost" ? "white" : "gray.700"}
          alignItems="center"
        >
          {title}
        </Text>

      </HStack>
    </NativeBaseButton>
  )
}