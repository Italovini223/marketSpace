import { useState } from 'react'

import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from '@routes/app.routes'


import { TouchableOpacity, Dimensions } from 'react-native'


import { PencilSimpleLine, ArrowLeft } from 'phosphor-react-native'

import { HStack, ScrollView, useTheme, Skeleton, VStack, Text, Box, Heading } from "native-base";
import Carousel from 'react-native-reanimated-carousel';

import { CarouselImage } from '@components/CarouselImage';

import { UserPhoto } from '@components/UserPhoto';
import { PayMethodCard } from '@components/PayMethodCard';
import { Button } from '@components/Button';

export function Product(){
  const [images, setImages] = useState([1,2,3,4])
  const [isLoading, setIsLoading] = useState(false)
  const [isMyProduct, setIsMyProduct] = useState(true)
  const [isActive, setIsActive] = useState(true)
  const [payMethods, setPayMethods] = useState(['pix', 'dinheiro', 'deposito'])
  const { sizes, colors } = useTheme()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleBack(){
    navigation.navigate('home')
  } 

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
          isMyProduct? 
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
          data={images}
          width={Dimensions.get('window').width}
          loop
          height={sizes[72]}
          renderItem={({item}) => (
            <CarouselImage 
              source={{uri: 'https://s3-alpha-sig.figma.com/img/56a0/7e43/8d8a171dd0517c35b31d54312b139654?Expires=1691366400&Signature=cbYpGh8yRvzMUoCZKppUHnXYUCFbgZHoYka6OBzhlK3QJ50yPM66G-RLNWcsCIz6jr7huunlKIgifCfp14m5c71NiYxb~uUUYA5cqoqK4oYY7caAnKTydXAP-YPZfDHJyVO1KphgPE6cNIsaenkQSBwyAkgbkvnc7KhtPHFK2evDv0JehYmBtb64DZ2X17IDcglH1-laZD6Q0hbpHG8cadMl~ZVau3XxtzDdG3xBYrQBFXz7EIJEVlTVThCfQwiKkPbB6aGMy6oPPiP9Zc8VSOwBE0McnQI7zOBzY7TlSbXnbd57nnK2s8kpopEOtHm2dkSrpcBP8ntQE3R87Ko9tA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'}}
              alt="teste"
            />
          )}
        />
      }

      <VStack flex={1} mx={6} mt={4}> 
        <HStack alignItems="center">
          <UserPhoto 
            size={6}
            source={{uri: 'https://github.com/italovini223.png'}}
            alt='user foto'
            mr={2}
          />
          <Text
            fontFamily="body"
            fontSize="sm"
            color="gray.700"
          >
            Ítalo Vinícius
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
          <Text>Usado</Text>
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
            Bicicleta
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
              49,99
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure corrupti eum, totam soluta vel molestiae veniam optio ipsam ipsum, magni beatae suscipit quas quo quos repellendus laboriosam ducimus rerum repudiandae.
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
              payMethods.map( (payMethod, index) => (
                <PayMethodCard 
                  payMethod={payMethod}
                  key={index}
                />
              ))
            }
          </VStack>
          {
            !isMyProduct  ?
            <Button 
              title='Entrar em contato'
              variant="outline"
              haveIcon
              iconName='phone-iphone'
              mt={4}
            />

            : 
              isActive ?
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