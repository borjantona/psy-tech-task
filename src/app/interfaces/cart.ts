import { Product } from './product';

export interface Cart {
  id: number;
  products: Product[];
  date: string;
  userId: number;
}
