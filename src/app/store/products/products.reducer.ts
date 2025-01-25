import { createReducer, on } from '@ngrx/store';
import _ from 'lodash';
import { loadCategories, loadProducts } from './products.actions';
import { ProductStore } from '../app.state';

const initialState: ProductStore = {
	products: [],
	categories: []
};

export const productsReducer = createReducer(
  initialState,
  on(loadProducts, (state, action) => {
	let _state = _.cloneDeep(state)
	_state.products = action.products;
	return _state;
  }),
  on(loadCategories, (state, action) => {
	let _state = _.cloneDeep(state)
	_state.categories = action.categories;
	return _state;
  })
);
