import { TouchableOpacity } from 'react-native'
import { AspectRatio, Box, HStack, Image, VStack, Text } from "native-base";
import ImgExample from '@assets/Image.png'
import { UserPhoto } from "./UserPhoto";

export function ProductCard(){
  return(
    <TouchableOpacity>
      <Box w="full" h={25}>
        <Image 
          source={ImgExample}
          alt="Imagem do produto"
          resizeMode="contain"
          position="absolute"
          rounded={6}
        />
      </Box>
      <HStack justifyContent="" >
          <UserPhoto 
            source={{uri: 'https://github.com/italovini223.png'}}
            alt="user image"
            size={6}
          />

          <Box>
            <Text>Usado</Text>
          </Box>
        </HStack>
    </TouchableOpacity>
  )
}