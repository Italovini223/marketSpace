import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Box, HStack, Image, VStack, Text, Skeleton, useTheme } from "native-base";
import ImgExample from '@assets/Image.png'
import { UserPhoto } from "./UserPhoto";

type Props = TouchableOpacityProps & {
  isLoading: boolean;
  isNew?: boolean;
}
export function ProductCard({ isLoading, isNew }: Props){
  const [isActive, setIsActive] = useState(false)

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { colors} = useTheme()

  function handleProduct(){
    navigation.navigate('product')
  }
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
        <TouchableOpacity style={{width: 155, marginRight: 5, marginBottom: 24,}} onPress={handleProduct} >
          <Box>
            <Image 
              source={ImgExample}
              alt='Imagem do produto'
              resizeMode='contain'
              position='absolute'
              rounded="md"
              blurRadius={isActive? 0: 3}
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
            {
              !isActive &&
              <Text 
                position="relative" 
                bottom={-40} 
                left={2}
                fontFamily="body"
                fontSize="xs"
                color="gray.100"
              >
                Anúncio desativado
              </Text>
            }
          </Box>
          <VStack position="relative" pt={16}>
            <Text fontSize="sm" fontFamily="body" color={ isActive ?"gray.600" : "gray.400"}>
              Tênis vermelho
            </Text>
            <HStack>
              <Text fontSize="sm" fontFamily="heading" color={ isActive ?"gray.600" : "gray.400"}>
                R$
              </Text>
              <Text fontSize="lg" fontFamily="heading" color={ isActive ?"gray.600" : "gray.400"}>
                56,60
              </Text>
            </HStack>
          </VStack>
        </TouchableOpacity>
      
      }
    </>
  )
}