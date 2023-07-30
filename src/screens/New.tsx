import { useState } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { HStack, Heading, ScrollView, VStack, useTheme, Text, TextArea, Radio, Stack, Switch, Checkbox } from "native-base";

import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { ArrowLeft } from 'phosphor-react-native'

import { ProductImageCard } from '@components/ProductImageCard';
import { SelectProductImage } from '@components/SelectProductImage';
import { Input } from '@components/Input';
import { HeadingTopic } from '@components/HeadingTopic';
import { Button } from '@components/Button';

export function New(){
  const [images, setImages] = useState(['https://s3-alpha-sig.figma.com/img/2b9d/0e16/12432335ff951fd0930c4fa7d271a8d5?Expires=1691366400&Signature=XiPh9ALBOtSoIsd3D87YAJc9lVScs9GK7zsTerKW0sRfKNTAaG0hoXD0ul88HcO2et9vHTX938Q9tc-Ak1x5~hxWt2H2g2mmdwluJ0dQwjBElqZdrK5W4Mzvt8IQp8~sW6j-7pet5AIcBjG~wDTPmKYCMgVRSn4fHSjSTFtm8JH0PtBWI8GMFX-Up51ObugYGPE1dVu2YCt9Lxfrh2M7IuQVRMvwiU2vJtp8ZBqmueIyn907R0pQQ5iaFoxw1mervzHdWHn0FN89uHol0~9cohcYbXPBuwsyFWy7adFYUro1o5jpdVK-fATr3G8JxoA7lorKy7CtiG~0CLnOjTX0Iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4', 'https://s3-alpha-sig.figma.com/img/56a0/7e43/8d8a171dd0517c35b31d54312b139654?Expires=1691366400&Signature=cbYpGh8yRvzMUoCZKppUHnXYUCFbgZHoYka6OBzhlK3QJ50yPM66G-RLNWcsCIz6jr7huunlKIgifCfp14m5c71NiYxb~uUUYA5cqoqK4oYY7caAnKTydXAP-YPZfDHJyVO1KphgPE6cNIsaenkQSBwyAkgbkvnc7KhtPHFK2evDv0JehYmBtb64DZ2X17IDcglH1-laZD6Q0hbpHG8cadMl~ZVau3XxtzDdG3xBYrQBFXz7EIJEVlTVThCfQwiKkPbB6aGMy6oPPiP9Zc8VSOwBE0McnQI7zOBzY7TlSbXnbd57nnK2s8kpopEOtHm2dkSrpcBP8ntQE3R87Ko9tA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'])
 const [paymentOptions, setPaymentOptions] = useState([])
  const { sizes, colors } = useTheme()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleBack(){
    navigation.navigate('home')
  }

  return(
    <ScrollView flex={1} bg="gray.200" showsVerticalScrollIndicator={false}>
      <VStack flex={1} pb={Platform.OS === 'android' ? 'auto' : 2}>
        <HStack w="full" h={24} alignItems="center" justifyContent="center" position="relative">
          <TouchableOpacity 
          onPress={handleBack}
            style={{
              position: 'absolute',
              left: sizes[6]
            }}
          >
            <ArrowLeft 
              size={sizes[6]}
              color={colors.gray[700]}
            />
          </TouchableOpacity>

          <Heading fontFamily="heading" fontSize="lg" color="gray.700">
          Criar anúncio
          </Heading>
        </HStack>
        <VStack flex={1} px={6}>
          <VStack w="full">
            <HeadingTopic title='Imagens'/>
            <Text>
              Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
            </Text>
            <HStack>
              {
                images &&
                images.map((image) => (
                  <ProductImageCard 
                    source={{uri: image}}
                    description='teste'
                    onPress={() => console.log('clicou')}
                    key={image}
                  />
                ))
              }
              <SelectProductImage />
            </HStack>
          </VStack>

          <VStack mt={8}>
            <HeadingTopic title='Sobre o produto'/>
            <Input 
              variant="white"
              placeholder='Nome do produto'
            />
            <TextArea 
              h={40}
              bg="white"
              borderWidth={0}
              rounded="md"
              color="gray.400"
              fontSize="md"
              placeholder="Descrição do produto"
              autoCompleteType={false}
            />

           <Radio.Group
            name='productStyle'
            defaultValue='new'
            flexDirection="row"
           >
            <Stack
              direction={{
                base: 'row'
              }}
              w="full"
              justifyContent="space-between"
              alignItems="center"
              mt={4}
            >
              <Radio value='new'>
                Produto novo
              </Radio>
              <Radio value='used'>
                Produto usado
              </Radio>

            </Stack>
           </Radio.Group>
          </VStack>

          <VStack mt={8}>
            <HeadingTopic title='Valor R$'/>
            <Input 
              variant="white"
              placeholder='Digite o valor do produto'
            />
          </VStack>

          <VStack mt={2}>
            <HeadingTopic title='Aceita troca?'/>
            <Switch 
              size="md"
              
            />
          </VStack>
          <VStack mt={4}>
            <HeadingTopic title='Meios de pagamento aceitos'/>
            <Checkbox.Group onChange={setPaymentOptions} value={paymentOptions}>
              <Checkbox value='boleto' mb={3}>Boleto</Checkbox>
              <Checkbox value='pix' mb={3}>Pix</Checkbox>
              <Checkbox value='dinheiro' mb={3}>Dinheiro</Checkbox>
              <Checkbox value='credito' mb={3}>Cartão de Crédito</Checkbox>
              <Checkbox value='deposito' mb={3}>Depósito Bancário</Checkbox>
            </Checkbox.Group>
          </VStack>
        </VStack>
        
      </VStack>
      <HStack w="full" h={24} bg="gray.100" px={6} alignItems="center" >
        
          <Button 
            title='Cancelar'
            w="50%"
            mr={3}
          />
          <Button 
            title='Avançar'
            variant="ghost"
            w="50%"
          />
      </HStack>
    </ScrollView>
  )
}