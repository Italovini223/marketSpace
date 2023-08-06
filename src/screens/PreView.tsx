import { useCallback, useState } from 'react'

import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { Dimensions } from 'react-native'

import { useProduct } from '@hooks/useProduct'
import { useAuth } from '@hooks/useAuth'

import { storageProductImagesGet } from '@storage/storageProductImage'

import { HStack, ScrollView, useTheme, useToast, VStack, Text, Box, Heading } from "native-base";
import Carousel from 'react-native-reanimated-carousel';

import { CarouselImage } from '@components/CarouselImage';

import { UserPhoto } from '@components/UserPhoto';
import { PayMethodCard } from '@components/PayMethodCard';
import { Button } from '@components/Button';
import { api } from '@services/api'
import { AppError } from '@utils/appError'

export function PreView(){
  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { sizes } = useTheme()
  const { product, createProduct } = useProduct()
  const { user } = useAuth()
  const toast = useToast()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleBack(){
    navigation.navigate('new')
  } 

  async function fetchImagesPreview(){
    const imagesPreview = await storageProductImagesGet()
    setImages(imagesPreview)
  }

  async function handleNewProduct(){
    try {
      setIsLoading(true)
      await createProduct(product)
      
      toast.show({
        title: 'Produto criado com sucesso',
        placement: 'top',
        bgColor: 'success.500'       
      })

      setIsLoading(false)
      navigation.navigate('home')

    } catch(error){
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'nao foi possível criar o produto!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchImagesPreview()
  }, []))

  return(
    <VStack flex={1} bg="gray.200"> 
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack w="full" h={25} bg="blue.500" alignItems="center" justifyContent="center" px={5}>
          <Heading fontFamily="heading" fontSize="md" color="gray.100">
            Pré visualização do anúncio
          </Heading>
          <Text fontFamily="body" fontSize="sm" color="gray.100">
            É assim que seu produto vai aparecer!
          </Text>
        </VStack>
 
          <Carousel 
            data={images}
            width={Dimensions.get('window').width}
            loop
            height={sizes[72]}
            renderItem={({item}) => (
              <CarouselImage 
                source={{uri: item}}
                alt="teste"
                isActive={true}
              />
            )}
          />
   

        <VStack flex={1} mx={6} mt={4}> 
          <HStack alignItems="center">
            <UserPhoto 
              size={6}
              source={{uri: `${api.defaults.baseURL}/images/${user.avatar}`}}
              alt='user foto'
              mr={2}
            />
            <Text
              fontFamily="body"
              fontSize="sm"
              color="gray.700"
            >
             {user.name}
            </Text>
          </HStack>

          <Box 
            w={16} 
            h={6}
            px={2}
            bgColor="gray.300"
            rounded="lg"
            alignItems="center"
            mt={6}
          >
            <Text>
              {product.is_new ? "Novo" : "Usado"}
            </Text>
          </Box>

          <HStack 
            alignItems="center" 
            justifyContent="space-between"
            mt={2}
          >
            <Heading
              fontFamily="heading"
              fontSize="lg"
              color="gray.700"
            >
              {product.name}
            </Heading>

            <HStack>
              <Text
                fontSize="xs"
                fontFamily="heading"
                color="blue.500"
              >
                R$
              </Text>
              <Heading
                fontSize="lg"
                fontFamily="heading"
                color="blue.500"
              >
                {product.price}
              </Heading>
            </HStack>
          </HStack>
          <Box
            flex={1}
            textAlign="center"
            mt={2}
            mr={1}
          >
            <Text
              fontSize="sm"
              fontFamily="body"
              color="gray.600"
            >
             {product.description}
            </Text>
          </Box>

          <VStack
            flex={1}
            mb={4}
          >

            <HStack
              mt={6}
              
            >
              <Text fontSize="sm" fontFamily="heading" color="gray.600" mr={2}>Aceita troca?</Text>
              <Text fontFamily="body" fontSize="sm" color="gray.600">{product. accept_trade? "sim" : 'Nao'}</Text>
            </HStack>

            <VStack flex={1} my={4}>
              <Text 
                fontSize="sm"
                fontFamily="heading"
                color="gray.600"
              >
                Modelos de pagamento:
              </Text>
              {
                product.payment_methods.map((payMethod, index) => (
                  <PayMethodCard 
                    payMethod={payMethod}
                    key={index}
                  />
                ))
              }
            </VStack>
           
          </VStack>
        </VStack>
      </ScrollView>
      <HStack w="full" h={25} bg="gray.100" alignItems="center" justifyContent="center" px={6}>
          <Button 
            title='Voltar e editar'
            haveIcon
            iconName='arrow-back'
            w="50%"
            mr={3}
            onPress={handleBack}
          />

          <Button 
            title='publicar'
            haveIcon
            iconName='local-offer'
            w='50%'
            variant="outline"
            isLoading={isLoading}
            onPress={handleNewProduct}
          />
      </HStack>
    </VStack>
  )
}