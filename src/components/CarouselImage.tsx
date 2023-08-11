import { Image, IImageProps, Box, Heading } from "native-base";

type Props = IImageProps & {
  alt: string,
  isActive: boolean
}

export function CarouselImage({ alt, isActive, ...rest }:Props){
  return(
    <Box
      position="relative"
      alignItems="center"
      justifyContent="center"
    >
      {!isActive && (
        <Heading
          flex={1}
          textTransform="uppercase"
          color="white"
          fontSize="lg"
          position="absolute"
          zIndex={100}
          bg="gray.300"
          p={1}
          w={240}
          textAlign="center"
          borderRadius={10}
        >
          Anúncio Desativado
        </Heading>
      )}
      <Image 
        alt={alt}
        w="full"
        h={72}
        resizeMode='stretch'
        blurRadius={isActive === true? 0: 10}
        {...rest}
      />
    </Box>
  )
}