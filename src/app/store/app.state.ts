import { Cart } from "../interfaces/cart";
import { Category, Product } from "../interfaces/product";

export interface IAppState {
	cart: Cart,
	products: ProductStore
}

export interface ProductStore {
	products: Product[],
	categories: Category[]
}