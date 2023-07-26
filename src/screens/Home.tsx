import { ActiveAds } from "@components/ActiveAds"
import { HomeHeader } from "@components/HomeHeader"
import { ScrollView, VStack, Text } from "native-base"

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
      </VStack>
    </ScrollView>
  )
}