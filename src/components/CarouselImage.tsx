import { useState } from 'react'
import { Image, IImageProps } from "native-base";

type Props = IImageProps & {
  alt: string,
  isActive: boolean
}

export function CarouselImage({ alt, isActive, ...rest }:Props){
  return(
    <>
      <Image 
        alt={alt}
        w="full"
        h={72}
        resizeMode='stretch'
        blurRadius={isActive === true? 0: 10}
        {...rest}
      />
    </>
  )
}