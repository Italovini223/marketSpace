import { useState, useEffect, useCallback } from 'react'

import { useAuth } from '@hooks/useAuth'
import { useProduct } from '@hooks/useProduct'

import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { useRoute } from '@react-navigation/native'

import { TouchableOpacity, Dimensions, Linking } from 'react-native'

import { PencilSimpleLine, ArrowLeft } from 'phosphor-react-native'

import { HStack, ScrollView, useTheme, Skeleton, VStack, Text, Box, Heading, useToast } from "native-base";
import Carousel from 'react-native-reanimated-carousel';

import { CarouselImage } from '@components/CarouselImage';

import { UserPhoto } from '@components/UserPhoto';
import { PayMethodCard } from '@components/PayMethodCard';
import { Button } from '@components/Button';
import { productResponseDto } from '@dtos/productResponseDto'
import { api } from '@services/api'
import { AppError } from '@utils/appError'
import { Loading } from '@components/Loading'

type routeParams = {
  id: string;
}

type responseDataProps = {
  data: productResponseDto
}


export function Product(){
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<productResponseDto>({} as productResponseDto)
  const [convertedPrice, setConvertedPrice] = useState('')
  const { sizes, colors } = useTheme()

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const toast = useToast()

  const { id } = route.params as routeParams
  const { user } = useAuth()
  const { setIsActiveProductStatus, deleteProduct } = useProduct()
  
  const isMyProduct = user.id === product.user?.user_id || product.user_id === user.id
  const isActive = product.is_active?  product.is_active === true ?  true : false : product.is_active === false ? false : true


  function handleBack(){
    navigation.navigate('home')
  } 

  function handleGoEdit(){
    navigation.navigate('edit', { product })
  }

  async function handleIsActiveProductStatus(is_new: boolean){
    try {
      setIsLoading(true)
      await setIsActiveProductStatus(is_new, id)

      toast.show({
        title: 'Status do produto atualizado com sucesso',
        placement: 'top',
        bgColor: 'success.500'
      })

      navigation.navigate('myProducts')

    } catch (error){
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível atualizar o status do produto'
      
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  async function handleDeleteProduct(){
    try {
      setIsLoading(true)

      await deleteProduct(product.id)

      toast.show({
        title: 'Produto excluído com sucesso',
        placement: 'top',
        bgColor: 'success.500'
      })

      navigation.navigate('myProducts')

    } catch(error){
      const isAppError = error instanceof AppError
      const title = isAppError? error.message : 'não foi possível excluir o produto'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setIsLoading(false)
    }
  }

  async function openWhatsAppUrl(){
    await Linking.openURL(`https://wa.me/55${product.user?.tel}`)
  }

  useFocusEffect(useCallback(() => {
    async function fetchProduct(){
      try{
        setIsLoading(true)
        const response: responseDataProps = await api.get(`/products/${id}`)
        setProduct(response.data)
        setConvertedPrice(response.data.price.toLocaleString('pt-br'))
      }catch(error){
        const isAppError = error instanceof AppError
        const title = isAppError? error.message : 'Nao foi  carregar o produto'
  
        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.500'
        })
  
        setIsLoading(false)
        navigation.navigate('home')
  
      } finally{
        setIsLoading(false)
      }
    }

    fetchProduct()

  }, [id]))




  return(
    <>
      {
        isLoading ?(
          <Loading />
        ):
        (
          <ScrollView flex={1} bg="gray.200" showsVerticalScrollIndicator={false}>
            <HStack w="full" h={20} bg="gray.100" alignItems="flex-end" justifyContent="space-between" px={5}>
              <TouchableOpacity onPress={handleBack}>
                <ArrowLeft 
                  size={sizes[6]}
                  color={colors.gray[700]}
                  style={{marginBottom: sizes[2]}}
                />
              </TouchableOpacity>
              {
                isMyProduct? 
                <TouchableOpacity onPress={handleGoEdit}>
                  <PencilSimpleLine 
                    size={sizes[6]}
                    color={colors.gray[700]}
                    style={{marginBottom: sizes[2]}}
                  />
                </TouchableOpacity>
                :
                undefined
              }
            </HStack>
            { 
              isLoading ?
              <Skeleton 
                w="full"
                h={72}
                startColor="gray.400"
                endColor="gray.300"
              />
              :
              <Carousel 
                data={product.product_images}
                width={Dimensions.get('window').width}
                loop
                height={sizes[72]}
                renderItem={({item}) => (
                  <CarouselImage 
                    source={{uri: `${api.defaults.baseURL}/images/${item.path}`}}
                    alt={`imagem de ${product.name}`}
                    isActive={isActive}
                  />
                )}
              />
            }

            <VStack flex={1} mx={6} mt={4}> 
              <HStack alignItems="center">
                {
                  isLoading ?
                  <Skeleton 
                    w={6}
                    h={6}
                    rounded="full"
                    />
                    :
                    <UserPhoto 
                      size={6}
                      source={{uri:`${api.defaults.baseURL}/images/${product.user?.avatar}`}}
                      alt="foto do usuário"
                      mr={2}
                    />
                }
                <Text
                  fontFamily="body"
                  fontSize="sm"
                  color="gray.700"
                >
                  {product.user?.name}
                </Text>
              </HStack>

              <Box 
                w={16} 
                h={6}
                px={2}
                bgColor={product.is_new ? "blue.500" : "gray.300"}
                rounded="lg"
                alignItems="center"
                mt={6}
              >
                <Text 
                color={product.is_new ? "white": "gray.700"}
                
                >
                  {product.is_new ? "Novo" : 'Usado'}
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
                  {convertedPrice}
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
                  <Text fontFamily="body" fontSize="sm" color="gray.600">{product.accept_trade? 'Sim' : 'Não'}</Text>
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
                    product.payment_methods &&
                    product.payment_methods.map((payMethod, index) => (
                      <PayMethodCard 
                        paymentMethod={payMethod}
                        key={index}
                      />
                    ))
                  }
                </VStack>
                {
                  !isMyProduct ?
                  <Button 
                    title='Entrar em contato'
                    variant="outline"
                    haveIcon
                    iconName='phone-iphone'
                    mt={4}
                    onPress={openWhatsAppUrl}
                  />

                  : 
                    product.is_active ?
                  <VStack mt={4}>
                    <Button 
                      title='Desativar anuncio'
                      variant="ghost"
                      haveIcon
                      iconName='power-settings-new'
                      onPress={() => handleIsActiveProductStatus(false)}
                    />
                    <Button 
                      title='Excluir anuncio'
                      haveIcon
                      iconName='delete-outline'
                      onPress={handleDeleteProduct}
                    />
                  </VStack>
                  :
                  <VStack mt={4}>
                    <Button 
                      title='Reativar anuncio'
                      variant="outline"
                      haveIcon
                      iconName='power-settings-new'
                      onPress={() => handleIsActiveProductStatus(true)}
                    />
                    <Button 
                      title='Excluir anuncio'
                      haveIcon
                      iconName='delete-outline'
                    />
                  </VStack>

                }
              </VStack>
            </VStack>
          </ScrollView>
        )
      }
    </>
  )
}