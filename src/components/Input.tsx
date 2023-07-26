import { Input as NativeBaseInput, IInputProps } from 'native-base'

export function Input({...rest}:IInputProps){
  return (
    <NativeBaseInput
      bg="gray.100"
      h={12}
      borderRadius={10}
      fontSize="md"
      color="gray.400"
      fontFamily="body"
      mb={4}
      borderWidth={0}
      {...rest}
    />
  )
}
