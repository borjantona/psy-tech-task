import { createAction, props } from '@ngrx/store';
import { Category, Product } from 'src/app/interfaces/product';

export const PRODUCT_ACTIONS = {
  GET_PRODUCTS: '[PRODUCTS] GET PRODUCTS',
  LOAD_PRODUCTS: '[PRODUCTS] LOAD PRODUCTS',
  GET_CATEGORIES: '[PRODUCTS] GET CATEGORIES',
  LOAD_CATEGORIES: '[PRODUCTS] LOAD CATEGORIES',
  ADD_FAVOURITE: '[PRODUCTS] ADD/REMOVE FAVOURITE',
};

export const getProducts = createAction(PRODUCT_ACTIONS.GET_PRODUCTS);
export const loadProducts = createAction(
  PRODUCT_ACTIONS.LOAD_PRODUCTS,
  props<{ products: Product[] }>()
);
export const getCategories = createAction(PRODUCT_ACTIONS.GET_CATEGORIES);
export const loadCategories = createAction(
  PRODUCT_ACTIONS.LOAD_CATEGORIES,
  props<{ categories: Category[] }>()
);
export const addRemoveFavourite = createAction(
  PRODUCT_ACTIONS.ADD_FAVOURITE,
  props<{ productId: number }>()
);

