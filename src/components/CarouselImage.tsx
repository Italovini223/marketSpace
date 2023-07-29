import { Image, IImageProps } from "native-base";

type Props = IImageProps & {
  alt: string
}

export function CarouselImage({ alt, ...rest }:Props){
  return(
    <Image 
      alt={alt}
      w="full"
      h={72}
      {...rest}
    />
  )
}