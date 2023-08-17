import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_CONTEXT_STORAGE } from './storageConfig'

type StorageAuthTokenPros = {
  token: string;
  refresh_token: string;
}

export async function storageAuthTokenSave({ refresh_token, token }: StorageAuthTokenPros){
  await AsyncStorage.setItem(AUTH_CONTEXT_STORAGE, JSON.stringify({ token, refresh_token }))
}

export async function storageAuthTokenGet(){
  const response = await AsyncStorage.getItem(AUTH_CONTEXT_STORAGE)

  const { refresh_token, token }: StorageAuthTokenPros = response ? JSON.parse(response) : {};

  return { token, refresh_token }
}