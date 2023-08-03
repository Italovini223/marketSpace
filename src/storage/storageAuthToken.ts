import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_CONTEXT_STORAGE } from './storageConfig'

export async function storageAuthTokenSave(token: string){
  await AsyncStorage.setItem(AUTH_CONTEXT_STORAGE, token)
}

export async function storageAuthTokenGet(){
  const token = await AsyncStorage.getItem(AUTH_CONTEXT_STORAGE)

  return token
}