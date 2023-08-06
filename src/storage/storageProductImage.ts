import AsyncStorage from "@react-native-async-storage/async-storage";
import { PRODUCT_IMAGE_STORAGE} from './storageConfig'

export async function storageProductImagesSave(imagesUrls: string[]){
  await AsyncStorage.setItem(PRODUCT_IMAGE_STORAGE, JSON.stringify(imagesUrls));
}

export async function storageProductImagesGet(){
  const storage = await AsyncStorage.getItem(PRODUCT_IMAGE_STORAGE);

  const images: string[] = storage ? JSON.parse(storage) : [];

  return images;
}

export async function storageProductImagesDelete(){
  await AsyncStorage.removeItem(PRODUCT_IMAGE_STORAGE )
}