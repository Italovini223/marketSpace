import { ReactNode, createContext, useState, useEffect } from "react";

import { productDto } from '@dtos/productDto'

import { api } from "@services/api";

import { storageProductSave, storageProductGet } from '@storage/storageProduct'

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

  async function createProduct({ name, price, accepted_trade, payment_methods, description, is_new, images}: productDto){
    try {
      const product_id = await api.post('/products', {
        name,
        price,
        accepted_trade,
        payment_methods,
        description,
        is_new
      })

      await api.post('/products/images', {
        product_id,
        images
      })

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