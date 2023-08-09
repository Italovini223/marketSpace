export type productDto = {
  id?: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: string[];
  images: any[];
  user?:{
    avatar: string;
  }

}
