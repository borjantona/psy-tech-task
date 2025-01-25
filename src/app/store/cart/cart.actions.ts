import { createAction, props } from '@ngrx/store';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';

export const CART_ACTIONS = {
  INIT_CART: '[CART] INIT CART',
  LOAD_CART: '[CART] LOAD CART',
  CREATE_CART: '[CART] CREATE CART',
  ADD_PRODUCT: '[CART] ADD PRODUCT',
  REMOVE_PRODUCT: '[CART] REMOVE PRODUCT',
  REMOVE_ALL_PRODUCT: '[CART] REMOVE ALL PRODUCTS',
  CLEAN_CART: '[CART] CLEAN CART',
};

export const initCart = createAction(
  CART_ACTIONS.INIT_CART,
  props<{ userId: number }>()
);
export const loadCart = createAction(
  CART_ACTIONS.LOAD_CART,
  props<{ cart: Cart }>()
);
export const createCart = createAction(
  CART_ACTIONS.CREATE_CART,
  props<{ userId: number }>()
);
export const addProduct = createAction(
  CART_ACTIONS.ADD_PRODUCT,
  props<{ product: Product }>()
);
export const removeProduct = createAction(
  CART_ACTIONS.REMOVE_PRODUCT,
  props<{ productId: number }>()
);
export const removeAllProducts = createAction(
	CART_ACTIONS.REMOVE_ALL_PRODUCT,
	props<{ productId: number }>()
  );
export const cleanCart = createAction(CART_ACTIONS.CLEAN_CART);
