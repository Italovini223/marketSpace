import { Box, Image, Pressable, useTheme, IImageProps } from "native-base";
import { X } from 'phosphor-react-native'

type Props = IImageProps & {
  onPress: () => void;
  description: string;
}

export function ProductImageCard({ description, source, onPress, ...rest}: Props){
  const { sizes, colors } = useTheme()
  return(
    <Box
      w={25}
      h={25}
      rounded="md"
      mr={2}
    >
      <Pressable
        w={4}
        h={4}
        rounded="full"
        position="relative"
        onPress={onPress}
      >
        <X 
          size={sizes[24]}
          color={colors.gray[100]}
        />
      </Pressable>

      <Image 
        resizeMode='contain'
        position='absolute'
        alt={description}
        {...rest}
      />
    </Box>
  )
}