import { ReactNode, createContext, useState, useEffect } from "react";

import { useAuth } from "@hooks/useAuth";

import { productDto } from '@dtos/productDto'

import { api } from "@services/api";

import { storageProductSave, storageProductGet, storageProductDelete } from '@storage/storageProduct'
import { string } from "yup";


type ProductContextDataPros = {
  product: productDto; 

  createProduct: (product: productDto) => Promise<void>;
  saveProduct: (product: productDto) => Promise<void>;
}

type ProductContextProviderProps = {
  children: ReactNode;
}


export const ProductContext = createContext<ProductContextDataPros>({} as ProductContextDataPros)

export function ProductContextProvider({children}: ProductContextProviderProps){
  const [product, setProduct] = useState<productDto>({} as productDto)
  

  async function saveProduct(product: productDto){
    await storageProductSave(product)
  
  }

  async function  getProduct(){
    const product = await storageProductGet()
    setProduct(product)
    
  }

  async function createProduct({ name, price, accept_trade, payment_methods, description, is_new, images}: productDto){
    try {
      const {data} = await api.post('/products', {
        name,
        price,
        accept_trade,
        payment_methods,
        description,
        is_new
      })

      const productImagesForm = new FormData()


      images.forEach(item => {
        const imageFile = {
          ...item,
          name: data.name + '.' + item.name
        } as any

        productImagesForm.append("images", imageFile)
      })

      productImagesForm.append("product_id", data.id)


      await api.post('/products/images', productImagesForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })

      storageProductDelete()

    } catch (error) {
      throw error
    } finally{

    }
  }
  useEffect(() => {
    getProduct()
  }, [saveProduct])

  return(
    <ProductContext.Provider
      value={{
        product,
        createProduct,
        saveProduct
      }}
    >
      { children }
    </ProductContext.Provider>
  )
}