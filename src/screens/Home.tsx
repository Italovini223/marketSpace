import { ActiveAds } from "@components/ActiveAds"
import { HomeHeader } from "@components/HomeHeader"
import { ScrollView, VStack, Text,useTheme } from "native-base"
import { Input } from "@components/Input"

export function Home(){
  return (
    <ScrollView bg="gray.100">
      <VStack flex={1} px={6}>
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
      </VStack>
    </ScrollView>
  )
}