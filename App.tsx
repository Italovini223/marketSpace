import { Karla_400Regular, Karla_700Bold, useFonts } from '@expo-google-fonts/karla'
import { Text, StatusBar } from 'react-native'

import { NativeBaseProvider } from 'native-base'
import { THEME } from './src/theme'

import { Loading } from '@components/Loading'

import { Routes } from '@routes/index'
import { SingIn } from '@screens/SingIn'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold
  })
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {
         fontsLoaded ? <Routes /> : <Loading />
      }
    </NativeBaseProvider>
  );
}


