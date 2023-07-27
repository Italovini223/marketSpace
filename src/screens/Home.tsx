import { useState } from "react"
import { ActiveAds } from "@components/ActiveAds"
import { HomeHeader } from "@components/HomeHeader"
import { ScrollView, VStack, Text, FlatList } from "native-base"
import { Input } from "@components/Input"
import { ProductCard } from "@components/ProductCard"

export function Home(){
  const [products, setProducts] = useState([1, 2, 3, 4, 5, 6, 7, 8])
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
            products.length < 2 ? 
              <FlatList 
                  data={products}
                  keyExtractor={item => String(item)}
                  flexDirection="row"
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