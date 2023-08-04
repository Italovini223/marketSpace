import AsyncStorage from "@react-native-async-storage/async-storage";

import { userDto } from "@dtos/userDto";

import { USER_STORAGE } from "./storageConfig";

export async function storageUserSave(user: userDto){
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet(){
  const storage = await AsyncStorage.getItem(USER_STORAGE)

  const user: userDto = storage ? JSON.parse(storage): {}

  return user
}

export async function storageUserRemove(){
  await AsyncStorage.removeItem(USER_STORAGE)
}