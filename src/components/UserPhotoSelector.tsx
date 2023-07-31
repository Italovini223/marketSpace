import { Box, Image, Button, useTheme, IButtonProps } from "native-base";

import { PencilSimple } from 'phosphor-react-native'

import DefaultImage from '@assets/DefaultAvatar.png'


type props = IButtonProps & {
  photoUri?: string;
  alt: string;
}

export function UserPhotoSelector({ alt, photoUri, ...rest }: props){
  const { colors, sizes } = useTheme()
 return (
  <Box w={22} h={22} rounded="full" borderColor="blue.500" borderWidth={2} position="relative" >
    <Image
      source={ photoUri ? {uri: photoUri}: DefaultImage}
      alt={alt}
      flex={1}
    />

    <Button
      w={10}
      h={10}
      bg="blue.500"
      alignItems="center"
      justifyContent="center"
      rounded="full"
      _pressed={{
        bg: 'blue.700'
      }}
      position="absolute"
      right={-10}
      bottom={0}
      {...rest}

    >
      <PencilSimple 
        color={colors.gray[100]}
        size={sizes[4]}
      />
    </Button>
  </Box>
 )
}