import { Alert } from "../interfaces/alerts";
import { Cart } from "../interfaces/cart";
import { Category, Product } from "../interfaces/product";

export interface IAppState {
	cart: Cart,
	products: ProductStore,
	alerts: Alert
}

export interface ProductStore {
	products: Product[],
	categories: Category[],
	favourites: Product[]
}