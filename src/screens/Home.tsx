import { useCallback, useState } from "react"

import { api } from "@services/api"

import { productDto } from '@dtos/productDto'

import { AppError } from "@utils/appError"

import { useFocusEffect } from "@react-navigation/native"

import { VStack, Text, FlatList, useToast } from "native-base"

import { ActiveAds } from "@components/ActiveAds"
import { HomeHeader } from "@components/HomeHeader"
import { Input } from "@components/Input"
import { ProductCard } from "@components/ProductCard"
import { Loading } from "@components/Loading"



export function Home(){
  const [products, setProducts] = useState<productDto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()

  async function fetchProducts(){
    try {
      setIsLoading(true)
      const response = await api.get('/products')

      console.log(response)

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
  }, []))


  return (
    <VStack bg="gray.100" flex={1} >
      <VStack flex={1} px={4}>
        <HomeHeader />

        <VStack >
          <Text color="gray.500" fontFamily="body" >
            Seus produtos anunciados para venda 
          </Text>
          <ActiveAds />
        </VStack>

        <VStack>
          <Text fontSize="sm" color="gray.500" mt={7}>Compre produtos variados</Text>
          <Input 
            placeholder="Buscar anúncio"
            haveIcon
            IconName="search"
            variant="white"
          />
        </VStack>

        <VStack flex={1} alignItems="center">
          {
            isLoading ?
            <Loading />
            :
            products.length < 2 ? 
              <FlatList 
                  data={products}
                  keyExtractor={item => String(item)}
                  flexDirection="row"
                  ListEmptyComponent={() => (
                    <Text fontFamily="heading" fontSize="md" color="gray.700" >
                      Ainda nao ha produtos cadastrados
                    </Text>
                  )}
                  renderItem={({item}) => (
                    <ProductCard 
                      isLoading={false}
                    />
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
                  />
              )}
            />

          }

        </VStack>


      </VStack>
    </VStack>
  )
}