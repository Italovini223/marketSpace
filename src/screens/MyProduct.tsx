import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native'

import { HStack, Heading, VStack, useTheme, Text, Select, FlatList, useToast } from "native-base";

import { useProduct } from '@hooks/useProduct';
import { useNavigation } from '@react-navigation/native';

import { productResponseDto } from '@dtos/productResponseDto';
import { AppNavigatorRoutesProps } from '@routes/app.routes'

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
  const [filteredProducts, setFilteredProducts] = useState<productResponseDto[]>([])

  const { sizes, colors } = useTheme()
  const toast = useToast()
  const { product } = useProduct()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  

  function handleApplyFilter(value?: string) {
    try { 
      setIsLoading(true)

      if(value === 'all'){
        setFilteredProducts(products)
      } else if(value === 'actives'){
        setFilteredProducts(products.filter(product => product.is_active === true))
      } else if(value === 'inactive'){
        setFilteredProducts(products.filter(product => product.is_active === false))
      }
      
    } catch(error){
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchProducts(){
    try {
      setIsLoading(true)
      const response = await api.get('/users/products')

      setProducts(response.data)
      setFilteredProducts(response.data)

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

  function handleNew(){
    navigation.navigate('new')
  }


  useFocusEffect(useCallback(() => {
    fetchProducts()
    setShowAlert(true)
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
            onPress={handleNew}
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
                onValueChange={value =>  handleApplyFilter(value)}
              >
                <Select.Item label='todos' value='all' />
                <Select.Item label='ativos' value='actives'/>
                <Select.Item label='inativos' value='inactive'/>
              </Select>
            </HStack>
          </HStack>
          
          <VStack flex={1} mt={5} alignItems="center">
            {
              isLoading ?
              <Loading />
              :
              filteredProducts.length < 2 ? 
                <FlatList 
                    data={filteredProducts}
                    keyExtractor={item => String(item)}
                    flexDirection="row"
                    key={'_'}
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
                  data={filteredProducts}
                  keyExtractor={item => String(item)}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    justifyContent: 'space-between'
                  }}
                  key={'#'}
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