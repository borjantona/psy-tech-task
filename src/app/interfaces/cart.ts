import { Product } from './product';

export interface Cart {
  id?: number;
  products: CartProduct[];
  date: string;
  userId: number;
}

export interface CartProduct {
	productId: number,
	quantity: number
}