import { Pressable, useTheme, IPressableProps, } from "native-base";
import { Plus } from 'phosphor-react-native'



export function SelectProductImage({...rest}: IPressableProps){
  const { sizes, colors } = useTheme()
  return (
    <Pressable
      w={25}
      h={25}
      bg="gray.300"
      rounded="md"
      alignItems="center"
      justifyContent="center"
      _pressed={{
        bg: 'gray.400'
      }}
      {...rest}
    >
      <Plus 
        size={sizes[6]}
        color={colors.gray[400]}
      />
    </Pressable>
  )
}