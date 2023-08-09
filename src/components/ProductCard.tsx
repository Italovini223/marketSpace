import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Box, HStack, Image, VStack, Text, Skeleton, useTheme } from "native-base";
import ImgExample from '@assets/Image.png'
import { UserPhoto } from "./UserPhoto";
import { api } from '@services/api';

type imageProductDataPros = {
  path: string;
  id: string;
}

type payMethodsDataProps = {
  key: string;
  name: string;
}

type imageProductUserProps = {
  avatar: string;
}

type Props = TouchableOpacityProps & {
  isLoading: boolean;
  is_active?: boolean;
  product: {
    id: string;
    name: string;
    price: number;
    is_new: boolean;
    accept_trade: boolean;
    product_images: imageProductDataPros[];
    user: imageProductUserProps
  };
}
export function ProductCard({ isLoading, is_active = true, product:{id, name, is_new, accept_trade, price, product_images, user} }: Props){

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleProduct(){
    navigation.navigate('product', {id})
    console.log(product_images[0].path)
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
        <TouchableOpacity style={{width: 155, marginRight: 5, marginBottom: 24,}} onPress={handleProduct} key={id}>
          <Box>
            <Image 
              source={{uri: `${api.defaults.baseURL}/images/${product_images[0].path}`}}
              alt='Imagem do produto'
              resizeMode="cover"
              position="absolute"
              borderRadius={10}
              h="24"
              w="full"
              blurRadius={is_active ? 0 : 10}
              borderColor="gray.500"
            />
  
            <HStack justifyContent="space-between" mt={1} px={1}>
              <UserPhoto 
                source={{uri: `${api.defaults.baseURL}/images/${user?.avatar}`}}
                alt='foto do usuário'
                size={6}
              />
  
              <Box 
                bg={is_new ? "blue.700" : "gray.600"}
                rounded="full"
                textAlign="center"
                px={2}
              >
                <Text color="white" fontSize="xs">
                  {is_new? 'Novo' : 'Usado'}
                </Text>
              </Box>
            </HStack>
            {
              !is_active &&
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
          <VStack position="relative" pt={20}>
            <Text fontSize="sm" fontFamily="body" color={ is_active ?"gray.600" : "gray.400"}>
              {name}
            </Text>
            <HStack>
              <Text fontSize="sm" fontFamily="heading" color={ is_active ?"gray.600" : "gray.400"}>
                R$
              </Text>
              <Text fontSize="lg" fontFamily="heading" color={ is_active ?"gray.600" : "gray.400"}>
                {price}
              </Text>
            </HStack>
          </VStack>
        </TouchableOpacity>
      
      }
    </>
  )
}