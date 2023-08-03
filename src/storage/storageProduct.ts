import AsyncStorage from "@react-native-async-storage/async-storage";
import { productDto } from "@dtos/productDto";
import { PRODUCT_STORAGE } from "./storageConfig";

export async function storageProductSave(product: productDto){
  await AsyncStorage.setItem(PRODUCT_STORAGE, JSON.stringify(product))
}

export async function storageProductGet(){
  const storage = await AsyncStorage.getItem(PRODUCT_STORAGE)

  const product: productDto = storage ? JSON.parse(storage) : {}

  return product
}

export async function storageProductDelete(){
  await AsyncStorage.removeItem(PRODUCT_STORAGE)
}