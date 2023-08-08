import { useCallback, useState } from "react"

import { api } from "@services/api"

import { useAuth } from '@hooks/useAuth'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"

import { productDto } from '@dtos/productDto'

import { AppError } from "@utils/appError"

import { useFocusEffect } from "@react-navigation/native"

import { Platform, TouchableOpacity } from 'react-native'
import { VStack, Text, FlatList, useToast, Input, HStack, useTheme, Modal, Heading, Radio, Switch, Checkbox } from "native-base"

import { MagnifyingGlass, Sliders, X } from 'phosphor-react-native'

import { ActiveAds } from "@components/ActiveAds"
import { HomeHeader } from "@components/HomeHeader"
import { ProductCard } from "@components/ProductCard"
import { Loading } from "@components/Loading"
import { HeadingTopic } from "@components/HeadingTopic"
import { Button } from "@components/Button"


type FormDataProps = {
  search: string | undefined;
}


export function Home(){
  const [products, setProducts] = useState<productDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [is_new, setIs_new] = useState(true)
  const [accept_trade, setAccept_trade] = useState(false)
  const [payment_methods, setPayment_methods] = useState<string[]>([
    "pix",
    "boleto",
    "cash",
    "deposit",
    "card",
  ])
  const { singOut } = useAuth()
  const toast = useToast()

  const {sizes, colors} = useTheme()
  const iconsSize = sizes[5]
  const iconsColor = colors.gray[700]

  const searchSchema = yup.object({
    search: yup.string()
  })
  

  const { control, handleSubmit} = useForm<FormDataProps>({
    defaultValues: {
      search: ""
    },
    resolver: yupResolver(searchSchema)
  })

  function handleFiltersDefaultValues(){
    setIs_new(true)
    setAccept_trade(false)
    setPayment_methods([
      "pix",
      "boleto",
      "cash",
      "deposit",
      "card",
    ])
  }

  async function fetchProducts(){
    try {
      setIsLoading(true)
      const response = await api.get('/products')

      console.log("PRODUTOS =>", response.data)

    } catch (error){
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Nao foi possível carregar os produtos'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

      if(title === 'token.invalid'){
        singOut()
      }
    }finally {
      setIsLoading(false)
    }
  }

  async function handleApplyFilter({ search }: FormDataProps){
    try {
      setIsLoading(true)
      console.log("ENTROU")
      let paymentMethodsQuery = ""

      payment_methods.map(method => {
        paymentMethodsQuery = paymentMethodsQuery + `&payment_methods=${method}`
      })

      const response = await api.get(`/products/?is_new${is_new}&accept_trade=${accept_trade}${paymentMethodsQuery}${
        search && search?.length > 0 && `&query=${search}`
      }`)

      setProducts(response.data)

    } catch (erro){
      const isAppErro = erro instanceof AppError
      const title = isAppErro ? erro.message : 'nao foi possível carregar os produtos'
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
    fetchProducts()
  }, []))


  return (
    <VStack bg="gray.100" flex={1} position="relative">
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
          <Controller 
            control={control}
            name="search"
            render={({field:{onChange, value}}) => (
              <Input 
                placeholder="Buscar anúncio"
                placeholderTextColor="gray.400"
                onChangeText={onChange}
                value={value}
                fontFamily="body"
                fontSize="md"
                w="full"
                bgColor="white"
                borderWidth={0}
                rounded="md"
                mb={6}
                InputRightElement={
                  <HStack w={20} alignItems="center" justifyContent="space-around">
                    <TouchableOpacity onPress={handleSubmit(handleApplyFilter)}>
                      <MagnifyingGlass 
                        size={iconsSize}
                        color={iconsColor}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowModal(true)}>
                      <Sliders 
                        size={iconsSize}
                        color={iconsColor}
                      />
                    </TouchableOpacity>
                  </HStack>
                }
              />

            )}
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

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        w="100%" 
        h="75%" 
        bgColor="white"
        position="absolute"
        bottom={0}
        borderTopRadius="xl"
        px={10}
       >
        <VStack flex={1}>
          <HStack  alignItems="center" justifyContent="space-between"  w="100%" mt={6} position="relative" >
            <Heading 
              fontFamily="heading" 
              fontSize="lg"
              color="gray.700"
              flex={1}
            >
              Filtrar anúncios
            </Heading>

            <TouchableOpacity 
              onPress={() => setShowModal(false)}
            >
              <X 
                size={iconsSize}
                color={colors.gray[400]}
              />
            </TouchableOpacity>
          </HStack>
          
          <VStack mt={6}>
            <HeadingTopic title="Condição"/>
            <Radio.Group
              name="isNewFilter"
              value={is_new === true? "new": "used"}
              onChange={nextValue => {
                setIs_new(nextValue === 'new'? true : false);
              }}
              w="full"
              
            >
              <HStack  alignItems="center" width="full" justifyContent="space-around">
                <Radio
                  value="used"
                >
                  <Text fontFamily="body" fontSize="sm" color="gray.600">
                    Usado
                  </Text>
                </Radio>
                <Radio
                  value="new"
                >
                  <Text fontFamily="body" fontSize="sm" color="gray.600">
                    Novo
                  </Text>
                </Radio>
              </HStack>
            </Radio.Group>
          </VStack>

          <VStack mt={6} position="relative">
            <HeadingTopic 
              title="Aceita troca?"
            />
            <Switch 
              onToggle={value => setAccept_trade(value)}
              value={accept_trade}
              m={0}
              position="absolute"
              top={2}
            />
          </VStack>

          <VStack mt={6}>
            <HeadingTopic 
              title="Meios de pagamento aceitos"
            />
            <Checkbox.Group
              value={payment_methods}
              onChange={setPayment_methods}
            >
                <Checkbox value='boleto' mb={3}>
                  <Text color="gray.600" fontSize="md">Boleto</Text>
                </Checkbox>
                <Checkbox value='pix' mb={3}>
                  <Text color="gray.600" fontSize="md">Pix</Text>
                </Checkbox>
                <Checkbox value='cash' mb={3}>
                  <Text color="gray.600" fontSize="md">Dinheiro</Text>
                </Checkbox>
                <Checkbox value='card' mb={3}>
                <Text color="gray.600" fontSize="md">Cartão de Crédito</Text>
                </Checkbox>
                <Checkbox value='deposit' mb={3}>
                  <Text color="gray.600" fontSize="md">Depósito Bancário</Text>
                </Checkbox>
            </Checkbox.Group>
          </VStack>
        </VStack>
        <HStack w="full">
          <Button 
            title="Resetar filtros"
            w="50%"
            mr={2}
            onPress={handleFiltersDefaultValues}
          />
          <Button 
            title="Aplicar filtros"
            variant="ghost"
            w="50%"
            onPress={handleSubmit(handleApplyFilter)}
          />
        </HStack>
      </Modal>
    </VStack>
  )
}