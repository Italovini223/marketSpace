import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { HStack, VStack, Text, Heading, Icon, useTheme} from "native-base";
import { UserPhoto } from "./UserPhoto";

import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from '@routes/app.routes'

export function HomeHeader(){
  const { colors } = useTheme()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleNewNavigate(){
    navigation.navigate('new')
  }

  return (
    <HStack bg="gray.100" pt={8} pb={8} alignItems="center">
      <UserPhoto 
        size={10}
        source={{uri: "https://github.com/italovini223.png"}}
        alt="Imagem do usuário"
        mr={4}
      />
      <VStack  flex={1}>
        <Text color="gray.700" fontSize="md">
          Boas vindas,
        </Text>
        <Heading color="gray.700" fontSize="md" fontFamily="heading">
          Ítalo!
        </Heading>
      </VStack>

      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', backgroundColor: colors.gray[700], height: 42, padding: 12, borderRadius: 6}}
        onPress={handleNewNavigate}
      >
        <Icon 
          as={MaterialIcons}
          name='add'
          color="gray.100"
          mr={1}
        />
        <Text color="gray.100" fontSize="sm" fontFamily="heading">
          Criar Anuncio
        </Text>
      </TouchableOpacity>

    </HStack>
  )
}