import { Karla_400Regular, Karla_700Bold, useFonts } from '@expo-google-fonts/karla'
import { Text, StatusBar } from 'react-native'

import { AuthContextProvider } from '@contexts/AuthContext'

import { NativeBaseProvider } from 'native-base'
import { THEME } from './src/theme'

import { Loading } from '@components/Loading'

import { Routes } from '@routes/index'


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
      <AuthContextProvider>
        { fontsLoaded ? <  Routes /> : <Loading /> }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}


