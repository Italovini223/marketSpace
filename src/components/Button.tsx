import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'

type props = IButtonProps & {
  title: string;
  variant?: 'outline' | 'ghost';
}

export function Button({title, variant, ...rest}:props){
  return (
    <NativeBaseButton 
      w="full"
      mb={10}
      h={10}
      bg={ variant === "outline" ? "blue.500" : variant === "ghost" ? "gray.700" : "gray.300"}
      rounded="sm"
      _pressed={{
        bg: variant === "outline" ? "blue.700" : variant === "ghost" ? 'gray.600' : "gray.200"
      }}
      {...rest}
    >
      <Text
        fontFamily="body"
        fontSize="sm"
        color={ variant === "outline" ? "gray.100" : variant === "ghost" ? "white" : "gray.700"}
        alignItems="center"
      >
        {title}
      </Text>
    </NativeBaseButton>
  )
}