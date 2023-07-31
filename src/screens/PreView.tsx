import { useState } from 'react'

import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { Dimensions } from 'react-native'

import { HStack, ScrollView, useTheme, Skeleton, VStack, Text, Box, Heading } from "native-base";
import Carousel from 'react-native-reanimated-carousel';

import { CarouselImage } from '@components/CarouselImage';

import { UserPhoto } from '@components/UserPhoto';
import { PayMethodCard } from '@components/PayMethodCard';
import { Button } from '@components/Button';

export function PreView(){
  const [images, setImages] = useState(['https://s3-alpha-sig.figma.com/img/2b9d/0e16/12432335ff951fd0930c4fa7d271a8d5?Expires=1691366400&Signature=XiPh9ALBOtSoIsd3D87YAJc9lVScs9GK7zsTerKW0sRfKNTAaG0hoXD0ul88HcO2et9vHTX938Q9tc-Ak1x5~hxWt2H2g2mmdwluJ0dQwjBElqZdrK5W4Mzvt8IQp8~sW6j-7pet5AIcBjG~wDTPmKYCMgVRSn4fHSjSTFtm8JH0PtBWI8GMFX-Up51ObugYGPE1dVu2YCt9Lxfrh2M7IuQVRMvwiU2vJtp8ZBqmueIyn907R0pQQ5iaFoxw1mervzHdWHn0FN89uHol0~9cohcYbXPBuwsyFWy7adFYUro1o5jpdVK-fATr3G8JxoA7lorKy7CtiG~0CLnOjTX0Iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4', 'https://s3-alpha-sig.figma.com/img/56a0/7e43/8d8a171dd0517c35b31d54312b139654?Expires=1691366400&Signature=cbYpGh8yRvzMUoCZKppUHnXYUCFbgZHoYka6OBzhlK3QJ50yPM66G-RLNWcsCIz6jr7huunlKIgifCfp14m5c71NiYxb~uUUYA5cqoqK4oYY7caAnKTydXAP-YPZfDHJyVO1KphgPE6cNIsaenkQSBwyAkgbkvnc7KhtPHFK2evDv0JehYmBtb64DZ2X17IDcglH1-laZD6Q0hbpHG8cadMl~ZVau3XxtzDdG3xBYrQBFXz7EIJEVlTVThCfQwiKkPbB6aGMy6oPPiP9Zc8VSOwBE0McnQI7zOBzY7TlSbXnbd57nnK2s8kpopEOtHm2dkSrpcBP8ntQE3R87Ko9tA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'])
  const [isLoading, setIsLoading] = useState(false)
  const [isMyProduct, setIsMyProduct] = useState(true)
  const [isActive, setIsActive] = useState(true)
  const [payMethods, setPayMethods] = useState(['pix', 'dinheiro', 'deposito'])
  const { sizes, colors } = useTheme()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleBack(){
    navigation.navigate('new')
  } 

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
                source={{uri: item}}
                alt="teste"
                isActive={true}
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
          />
      </HStack>
    </VStack>
  )
}