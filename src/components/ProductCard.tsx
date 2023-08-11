import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { useAuth } from '@hooks/useAuth';

import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Box, HStack, Image, VStack, Text, Skeleton } from "native-base";
import { UserPhoto } from "./UserPhoto";
import { api } from '@services/api';
import { productResponseDto } from '@dtos/productResponseDto';

type Props = TouchableOpacityProps & {
  isLoading: boolean;
  product: productResponseDto;
}
export function ProductCard({ isLoading, product }: Props){

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { user } = useAuth()

  const isMyProduct = product.user?.user_id === user.id || product.user_id === user.id
  const isActive = product.is_active?  product.is_active === true ?  true : false : product.is_active === false ? false : true

  function handleProduct(){
    navigation.navigate('product', {id: product.id})
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
        <TouchableOpacity style={{width: 155, marginRight: 5, marginBottom: 24,}} onPress={handleProduct} key={product.id}>
          <Box>
            <Image 
              source={{uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`}}
              alt='Imagem do produto'
              resizeMode="cover"
              position="absolute"
              borderRadius={10}
              h="24"
              w="full"
              blurRadius={isActive? 0 : 10}
              borderColor="gray.500"
            />
  
            <HStack justifyContent="space-between" mt={1} px={1}>
              <UserPhoto 
                source={{uri: `${api.defaults.baseURL}/images/${isMyProduct? user.avatar : product.user?.avatar}`}}
                alt='foto do usuário'
                size={6}
              />
  
              <Box 
                bg={product.is_new ? "blue.700" : "gray.600"}
                rounded="full"
                textAlign="center"
                px={2}
              >
                <Text color="white" fontSize="xs">
                  {product.is_new? 'Novo' : 'Usado'}
                </Text>
              </Box>
            </HStack>
            {
              !isActive ?
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
              :
              undefined
            }
          </Box>
          <VStack position="relative" pt={20}>
            <Text fontSize="sm" fontFamily="body" color={ isActive ?"gray.600" : "gray.400"}>
              {product.name}
            </Text>
            <HStack>
              <Text fontSize="sm" fontFamily="heading" color={ isActive ?"gray.600" : "gray.400"}>
                R$
              </Text>
              <Text fontSize="lg" fontFamily="heading" color={isActive ?"gray.600" : "gray.400"}>
                {product.price.toLocaleString("pt-br")}
              </Text>
            </HStack>
          </VStack>
        </TouchableOpacity>
      
      }
    </>
  )
}