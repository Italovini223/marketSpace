type payment_methodsProps = {
  key: string;
  name: string;
}

export type productResponseDto = {
  id?: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: payment_methodsProps[]
  product_images: any[];
  user?:{
    avatar: string;
    name?: string;
    tel?:string;
    user_id?: string;
  }

}
