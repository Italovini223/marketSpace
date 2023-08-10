type payment_methodsProps = {
  key: string;
  name: string;
}

type imageProductDataPros = {
  path: string;
  id: string;
}


export type productResponseDto = {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  user_id?: string;
  is_active?: boolean;
  payment_methods: payment_methodsProps[]
  product_images: imageProductDataPros[];
  user?:{
    avatar: string;
    name: string;
    tel:string;
    user_id?: string;
  }

}
