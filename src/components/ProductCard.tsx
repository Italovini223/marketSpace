
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Box, HStack, Image, VStack, Text, Skeleton } from "native-base";
import ImgExample from '@assets/Image.png'
import { UserPhoto } from "./UserPhoto";

type Props = TouchableOpacityProps & {
  isLoading: boolean;
  isNew?: boolean;
}
export function ProductCard({ isLoading, isNew, ...rest }: Props){
  return(
    <>
      { 
        isLoading == true ?
        <Skeleton 
          w={40}
          h={40}
          mr={2}
          mb={6}
          startColor="gray.300"
          endColor="gray.200"
        />
        :
        <TouchableOpacity style={{width: 155, marginRight: 5, marginBottom: 24}} {...rest}>
          <Box>
            <Image 
              source={ImgExample}
              alt='Imagem do produto'
              resizeMode='contain'
              position='absolute'
              rounded="md"
            />
  
            <HStack justifyContent="space-between" mt={1} px={1}>
              <UserPhoto 
                source={{uri: "https://github.com/italovini223.png"}}
                alt='foto do usuário'
                size={6}
              />
  
              <Box 
                bg={isNew ? "blue.700" : "gray.600"}
                rounded="full"
                textAlign="center"
                px={2}
              >
                <Text color="white" fontSize="xs">
                  usado
                </Text>
              </Box>
            </HStack>
          </Box>
          <VStack position="relative" pt={20}>
            <Text fontSize="sm" fontFamily="body" color="gray.600">
              Tênis vermelho
            </Text>
            <HStack>
              <Text fontSize="sm" fontFamily="heading">
                R$
              </Text>
              <Text fontSize="lg" fontFamily="heading">
                56,60
              </Text>
            </HStack>
          </VStack>
        </TouchableOpacity>
      
      }
    </>
  )
}