import { useState } from 'react';
import { TouchableOpacity } from 'react-native'
import { HStack, Heading, VStack, useTheme, Text, Select, FlatList } from "native-base";

import { Plus } from 'phosphor-react-native'
import { ProductCard } from '@components/ProductCard';
import { Loading } from '@components/Loading';


export function MyProducts() {
  const [products, setProducts] = useState([1,2,3,4,5])
  const [isLoading, setIsLoading] = useState(false)
  const { sizes, colors } = useTheme()
  return (
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
            9 anúncios
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
  );
}