import { ReactNode, createContext, useState, useEffect } from "react";

import { useAuth } from "@hooks/useAuth";

import { productDto } from '@dtos/productDto'

import { api } from "@services/api";

import { storageProductSave, storageProductGet, storageProductDelete } from '@storage/storageProduct'



type ProductContextDataPros = {
  product: productDto; 
  createProduct: (product: productDto) => Promise<void>;
  saveProduct: (product: productDto) => Promise<void>;
  setIsActiveProductStatus: (is_active: boolean, id: string) => Promise<void>;
  updateProduct: (product: productDto, productImagesIds: any[]) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
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

  async function setIsActiveProductStatus(is_active: boolean, id: string){
    try {
      await api.patch(`/products/${id}`, {
        is_active
      })

    } catch (error){
      throw error
    }
  }

  async function saveProductImages(images: any[], id: string, productName: string){
    try {

      const productImagesForm = new FormData()

      images.forEach(item => {
        const imageFile = {
          ...item,
          name: productName + '.' + item.name
        } as any

        productImagesForm.append("images", imageFile)
      })

      productImagesForm.append("product_id", id)


      await api.post('/products/images', productImagesForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })

    } catch (error){
      throw error
    }
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

      await saveProductImages(images, data.id, data.name)

      storageProductDelete()

    } catch (error) {
      throw error
    } finally{

    }
  }


  async function updateProduct({name, description, is_new, price, accept_trade, payment_methods, images, id }: productDto, productImagesIds: any[]){
    try {


      await api.put(`/products/${id}`, {
        name,
        description,
        is_new,
        price,
        accept_trade,
        payment_methods
      })

      if(images.length > 0){
        await saveProductImages(images, id ? id: '', name)
      }

      if(productImagesIds.length > 0){
        await api.delete('/products/images', {
          data: {productImagesIds}
        })

        
      }

      
    } catch (error){
      throw error
    } 
  }



  async function deleteProduct(id: string){
    try {
      await api.delete(`/products/${id}`)
    }catch(error){
      throw error
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
        saveProduct,
        setIsActiveProductStatus,
        updateProduct,
        deleteProduct
      }}
    >
      { children }
    </ProductContext.Provider>
  )
}