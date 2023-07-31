import { Box, Image, Button, useTheme, IButtonProps, Skeleton } from "native-base";

import { PencilSimple } from 'phosphor-react-native'

import DefaultImage from '@assets/DefaultAvatar.png'


type props = IButtonProps & {
  photoUri?: string;
  alt: string;
  isLoading?: boolean;
}

export function UserPhotoSelector({ alt, photoUri, isLoading = false, ...rest }: props){
  const { colors, sizes } = useTheme()
 return (
  <>
    {
      isLoading?
      <Skeleton 
        w={10}
        h={10}
        rounded="full"
      />
      :
      <Box w={22} h={22} rounded="full" borderColor="blue.500" borderWidth={4} position="relative" >
        <Image
          source={ photoUri ? {uri: photoUri}: DefaultImage}
          alt={alt}
          flex={1}
          rounded="full"
          position="relative"
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

    }
  </>
 )
}