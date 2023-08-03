import { Box, Image, Pressable, useTheme, IImageProps, Skeleton } from "native-base";
import { color } from "native-base/lib/typescript/theme/styled-system";
import { X } from 'phosphor-react-native'

type Props = IImageProps & {
  onPress: () => void;
  description: string;
  uri: string;
  isLoading: boolean;
}

export function ProductImageCard({ description, source, uri, isLoading, onPress, ...rest}: Props){
  const { sizes, colors } = useTheme()
  return(
    <>
      {
        isLoading ?
        <Skeleton 
          w={25}
          h={25}
          startColor="gray.400"
          endColor="gray.300"
          mr={3}
        />
        :
        <Box
          w={25}
          h={25}
          mr={3}
          position="relative"
        >
          <Image 
            bgColor="gray.300"
            flex={1}
            rounded="xl"
            source={{uri}}
            {...rest}
            alt={description}
          />

          <Pressable
            w={5}
            h={5}
            rounded="full"
            bg="gray.600"
            position="absolute"
            alignItems="center"
            justifyContent="center"
            right={1}
            top={1}
            onPress={onPress}
            _pressed={{
              bg: 'gray.400'
            }}
          >

            <X 
              size={sizes[3]}
              color={colors.gray[100]}
            />

          </Pressable>

        </Box>

      }
    </>
  )
}