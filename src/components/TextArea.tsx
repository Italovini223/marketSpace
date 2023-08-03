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
        h={40}
        bg="white"
        borderWidth={0}
        rounded="md"
        color="gray.400"
        fontSize="md"
        placeholder="Descrição do produto"
        autoCompleteType={false}
        _invalid={{
          borderWidth: 2,
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