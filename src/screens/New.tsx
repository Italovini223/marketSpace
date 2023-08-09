import { useState } from 'react'

import { Platform, TouchableOpacity } from 'react-native'
import { HStack, Heading, ScrollView, VStack, useTheme, Text, Radio, Stack, Switch, Checkbox, useToast } from "native-base";

import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { useProduct } from '@hooks/useProduct';

import { ArrowLeft } from 'phosphor-react-native'

import * as ImagePicker from 'expo-image-picker'

import * as FileSystem from 'expo-file-system'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import { storageProductImagesSave } from '@storage/storageProductImage'

import { useForm, Controller } from 'react-hook-form'

import { ProductImageCard } from '@components/ProductImageCard';
import { SelectProductImage } from '@components/SelectProductImage';
import { Input } from '@components/Input';
import { HeadingTopic } from '@components/HeadingTopic';
import { Button } from '@components/Button';
import { TextArea } from '@components/TextArea';


type formDataProps = {
  name: string;
  description: string;
  price: string;
}

const priceRegex = /(([1-9]\d{0,2}(\.\d{3})*)|(([1-9]\.\d*)?\d))(\,\d\d)/

const saveProductSchema = yup.object({
  name: yup.string().required('Informe o nome do produto'),
  description: yup.string().required('Informe uma descrição para o produto').max(120, 'Limite de 120 caracteres'),
  price: yup.string().required('Informe um preço').matches(priceRegex, 'Informe um valor valido')
})

export function New(){
  const [images, setImages] = useState<string[]>([])
  const [imagesFiles, setImagesFiles] = useState<any[]>([])
  const [loadingImage, setLoadingImage] = useState(false)
  const [paymentOptions, setPaymentOptions] = useState<string[]>([])
  const [ accept_trade, setAccept_trade] = useState(false)
  const [isNew, setIsNew] = useState('')

  const { sizes, colors } = useTheme()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { saveProduct } = useProduct()

  const { control, handleSubmit, formState:{errors} } = useForm<formDataProps>({
    resolver: yupResolver(saveProductSchema)
  })

  
  const toast = useToast()

  function handleBack(){
    navigation.navigate('home')
  }


  async function handleProductImageSelect(){
    try {
      setLoadingImage(true)
      const photoSelect = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })
  
      if(photoSelect.canceled){
        return
      }

      const photoInfo = await FileSystem.getInfoAsync(photoSelect.assets[0].uri, { size: true})

      if(photoInfo.exists && (photoInfo.size /1024 /1024) > 5){
        toast.show({
          title: 'Essa imagem e muito grande. Escolha uma ate 5MB',
          placement: 'top',
          bgColor: 'red.500'
        })
        return 
      }

      const fileExtension = photoSelect.assets[0].uri.split('.').pop();

      const photoFile = {
        name: `image_picture.${fileExtension}`,
        uri: photoSelect.assets[0].uri,
        type: `${photoSelect.assets[0].uri}/${fileExtension}`
      }

      setImagesFiles([...imagesFiles, photoFile]);
      setImages([...images, photoSelect.assets[0].uri])

    } catch (error){
      console.log(error)
    } finally {
      setLoadingImage(false)
    }
  }

  async function handleSaveProduct({ description, name, price }: formDataProps){
    console.log(paymentOptions)
    console.log( accept_trade)
    console.log(isNew)

    const priceWithoutComma = price.replace(/,/g, '');
    const priceNumber = parseFloat(priceWithoutComma);

    console.log(priceNumber)


    const product = {
      name,
      description,
      price: priceNumber/10,
      payment_methods: paymentOptions,
       accept_trade,
      is_new: isNew === 'new' ? true : false,
      product_images: imagesFiles,
    }

    await storageProductImagesSave(images)

    await saveProduct(product)

    navigation.navigate('preView')



  }

  return(
    <VStack flex={1} bg="gray.200">
      <ScrollView showsVerticalScrollIndicator={false}>
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
                      uri={image}
                      description='teste'
                      onPress={() => console.log('clicou')}
                      isLoading={loadingImage}
                      key={image}
                    />
                  ))
                }
                {
                  images.length < 3 && 
                  <SelectProductImage 
                    onPress={handleProductImageSelect}
                  />
                }
              </HStack>
            </VStack>

            <VStack mt={8}>
              <HeadingTopic title='Sobre o produto'/>
              <Controller 
                control={control}
                name='name'
                render={({field:{onChange, value}}) => (
                  <Input 
                    variant="white"
                    placeholder='Nome do produto'
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.name?.message}
                  />

                )}
              />
              <Controller 
                control={control}
                name='description'
                render={({field:{onChange, value}}) => (
                  <TextArea 
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.description?.message}
                  />

                )}
              />

            <Radio.Group
              name='productStyle'
              defaultValue='new'
              flexDirection="row"
              value={isNew}
              onChange={value => setIsNew(value)}
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
              <Controller 
                control={control}
                name='price'
                render={({field:{value,onChange}}) => (
                  <Input 
                    variant="white"
                    placeholder='Digite o valor do produto'
                    keyboardType='numbers-and-punctuation'
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.price?.message}

                  />
                )}
              />
            </VStack>

            <VStack mt={2} position="relative">
              <HeadingTopic title='Aceita troca?'/>
              <Switch 
                size="md"
                position="absolute"
                top={ Platform.OS === 'android' ? 3 : 5}
                onValueChange={() => setAccept_trade(! accept_trade)}
              />
            </VStack>
            <VStack mt={4}>
              <HeadingTopic title='Meios de pagamento aceitos'/>
              <Checkbox.Group onChange={setPaymentOptions} value={paymentOptions}>
                <Checkbox value='boleto' mb={3}>Boleto</Checkbox>
                <Checkbox value='pix' mb={3}>Pix</Checkbox>
                <Checkbox value='cash' mb={3}>Dinheiro</Checkbox>
                <Checkbox value='card' mb={3}>Cartão de Crédito</Checkbox>
                <Checkbox value='deposit' mb={3}>Depósito Bancário</Checkbox>
              </Checkbox.Group>
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
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
              onPress={handleSubmit(handleSaveProduct)}
            />
        </HStack>
    </VStack>
  )
}