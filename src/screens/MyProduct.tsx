import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native'

import { HStack, Heading, VStack, useTheme, Text, Select, FlatList, useToast } from "native-base";

import { useProduct } from '@hooks/useProduct';

import { productResponseDto } from '@dtos/productResponseDto';
import { AppError } from '@utils/appError';

import { Plus } from 'phosphor-react-native'

import { ProductCard } from '@components/ProductCard';
import { Loading } from '@components/Loading';
import { api } from '@services/api';
import { Alert } from '@components/Alert';



export function MyProducts() {
  const [products, setProducts] = useState<productResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(true)

  const { sizes, colors } = useTheme()
  const toast = useToast()
  const { product } = useProduct()

  async function fetchProducts(){
    try {
      setIsLoading(true)
      const response = await api.get('/users/products')

      setProducts(response.data)

    } catch (error){
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Nao foi possível carregar os produtos'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchProducts()
    setShowAlert(true)
    console.log("LOCAL STORAGE => ",product)
  }, []))


  return (
    <>
    {
      isLoading ?
      <Loading />
      :
      <VStack flex={1} bg="gray.200">
        <HStack alignItems="center" justifyContent="center" w="full" h={24} position="relative">
          <Heading
            fontFamily="heading"
            fontSize="lg"
            color="gray.700"

          >
            Meus anúncios
          </Heading>
          <TouchableOpacity 
            style={{
              position: 'absolute',
              right: sizes[6]
            }}
          >
            <Plus 
              size={sizes[6]}
              color={colors.gray[700]}
            />
          </TouchableOpacity>
        </HStack>
        
        <VStack flex={1} px={6}>
          <HStack>
            <HStack w="full" justifyContent="space-between" alignItems="center">
              <Text
                fontFamily="body"
                fontSize="sm"
                color="gray.600"
              >
                {products.length} {products.length > 1 ? "anúncios" : "anúncio"} 
              </Text>

              <Select 
                bg="gray.200"
                borderColor="gray.600"
                color="gray.600"
                defaultValue='todos'
                w={24}
                rounded="md"
              >
                <Select.Item label='todos' value='todos' />
                <Select.Item label='novo' value='novo'/>
                <Select.Item label='usado' value='usado'/>
              </Select>
            </HStack>
          </HStack>
          
          <VStack flex={1} mt={5} alignItems="center">
            {
              isLoading ?
              <Loading />
              :
              products.length < 2 ? 
                <FlatList 
                    data={products}
                    keyExtractor={item => String(item)}
                    flexDirection="row"

                    renderItem={({item}) => (
                      <ProductCard 
                        isLoading={false}
                        product={item}
                      />
                    )}
                    ListEmptyComponent={() => (
                      <Text fontFamily="body" fontSize="md" color="gray.700">
                        Voce ainda nao tem produtos cadastrados
                      </Text>
                    )}
                />

                :

                <FlatList 
                  data={products}
                  keyExtractor={item => String(item)}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    justifyContent: 'space-between'
                  }}
                  numColumns={2}
                  renderItem={({item}) => (
                    <ProductCard 
                      isLoading={false}
                      product={item}
                    />
                )}
                />
            }

          </VStack>
          </VStack>
          {
            product.id && showAlert ?  
            <Alert 
              handleOnPress={() => setShowAlert(false)}
            />
            :
            undefined
          }
      </VStack>
      
    }
    </>
  );
}