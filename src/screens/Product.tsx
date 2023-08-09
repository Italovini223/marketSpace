import { useState, useEffect } from 'react'

import { useAuth } from '@hooks/useAuth'

import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { useRoute } from '@react-navigation/native'

import { TouchableOpacity, Dimensions } from 'react-native'

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

type routeParams = {
  id: string;
}


export function Product(){
  const [images, setImages] = useState(['https://s3-alpha-sig.figma.com/img/2b9d/0e16/12432335ff951fd0930c4fa7d271a8d5?Expires=1691366400&Signature=XiPh9ALBOtSoIsd3D87YAJc9lVScs9GK7zsTerKW0sRfKNTAaG0hoXD0ul88HcO2et9vHTX938Q9tc-Ak1x5~hxWt2H2g2mmdwluJ0dQwjBElqZdrK5W4Mzvt8IQp8~sW6j-7pet5AIcBjG~wDTPmKYCMgVRSn4fHSjSTFtm8JH0PtBWI8GMFX-Up51ObugYGPE1dVu2YCt9Lxfrh2M7IuQVRMvwiU2vJtp8ZBqmueIyn907R0pQQ5iaFoxw1mervzHdWHn0FN89uHol0~9cohcYbXPBuwsyFWy7adFYUro1o5jpdVK-fATr3G8JxoA7lorKy7CtiG~0CLnOjTX0Iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4', 'https://s3-alpha-sig.figma.com/img/56a0/7e43/8d8a171dd0517c35b31d54312b139654?Expires=1691366400&Signature=cbYpGh8yRvzMUoCZKppUHnXYUCFbgZHoYka6OBzhlK3QJ50yPM66G-RLNWcsCIz6jr7huunlKIgifCfp14m5c71NiYxb~uUUYA5cqoqK4oYY7caAnKTydXAP-YPZfDHJyVO1KphgPE6cNIsaenkQSBwyAkgbkvnc7KhtPHFK2evDv0JehYmBtb64DZ2X17IDcglH1-laZD6Q0hbpHG8cadMl~ZVau3XxtzDdG3xBYrQBFXz7EIJEVlTVThCfQwiKkPbB6aGMy6oPPiP9Zc8VSOwBE0McnQI7zOBzY7TlSbXnbd57nnK2s8kpopEOtHm2dkSrpcBP8ntQE3R87Ko9tA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'])
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<productResponseDto>({} as productResponseDto)
  const { sizes, colors } = useTheme()

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const toast = useToast()

  const { id } = route.params as routeParams
  const { user } = useAuth()

  const isMyProduct = user.id === product.user?.user_id

  function handleBack(){
    navigation.navigate('home')
  } 

  async function fetchProduct(){
    try{
      setIsLoading(true)
      const response = await api.get(`/products/${id}`)
      setProduct(response.data)
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

  useEffect(() => {
    fetchProduct()
  }, [])

  return(
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
          product.user?.user_id === user.id? 
          <TouchableOpacity>
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
              isActive={true}
            />
          )}
        />
      }

      <VStack flex={1} mx={6} mt={4}> 
        <HStack alignItems="center">
          <UserPhoto 
            size={6}
            source={{uri:`${api.defaults.baseURL}/images/${product.user?.avatar}`}}
            alt="foto do usuário"
            mr={2}
          />
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
          color={product.is_new ? "white": "gray.700"}
        >
          <Text>{product.is_new ? "Novo" : 'Usado'}</Text>
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
            <Text fontFamily="body" fontSize="sm" color="gray.600">Sim</Text>
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
            />

            : 
              product.is_new ?
            <VStack mt={4}>
              <Button 
                title='Desativar anuncio'
                variant="ghost"
                haveIcon
                iconName='power-settings-new'
              />
              <Button 
                title='Excluir anuncio'
                haveIcon
                iconName='delete-outline'
              />
            </VStack>
            :
            <VStack mt={4}>
              <Button 
                title='Reativar anuncio'
                variant="outline"
                haveIcon
                iconName='power-settings-new'
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