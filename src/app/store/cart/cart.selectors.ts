import { createSelector } from '@ngrx/store';
import { Cart } from 'src/app/interfaces/cart';

export const selectCart = (state: { cart: Cart }) => state.cart;
export const selectCartTotal = createSelector(
  selectCart,
  (cart: Cart) =>  { 
	const totalProducts = cart.products.reduce((acc, product) => acc + product.quantity, 0);
	return totalProducts
}
);
