import { TextArea as NativeBaseTextArea, ITextAreaProps, FormControl } from "native-base"

type props = ITextAreaProps & {
  errorMessage?: string | null;
}

export function TextArea({ errorMessage, isInvalid, ...rest}: props){
  const invalid = !!errorMessage || isInvalid
  return(
    <FormControl
      isInvalid={invalid}
      mb={4}
    >
      <NativeBaseTextArea 
        bg="white"
        h={40}
        borderWidth={0}
        rounded="md"
        placeholderTextColor="gray.400"
        fontSize="md"
        placeholder="Descrição do produto"
        autoCompleteType={false}
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500'
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}