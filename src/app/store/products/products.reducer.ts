import { createReducer, on } from '@ngrx/store';
import _ from 'lodash';
import { addRemoveFavourite, loadCategories, loadProducts } from './products.actions';
import { ProductStore } from '../app.state';

const initialState: ProductStore = {
	products: [],
	categories: [],
	favourites: []
};

export const productsReducer = createReducer(
  initialState,
  on(loadProducts, (state, action) => {
	const _state = _.cloneDeep(state)
	_state.products = action.products;
	return _state;
  }),
  on(loadCategories, (state, action) => {
	const _state = _.cloneDeep(state)
	_state.categories = action.categories;
	return _state;
  }),
  on(addRemoveFavourite, (state, action) => {
	const _state = _.cloneDeep(state);
	const favIndex = _state.favourites.findIndex(prod => prod.id === action.productId);
	if (favIndex === -1) {
		const prod = _state.products.find(prod => prod.id === action.productId)!;
		_state.favourites.push(prod);
	} else {
		_state.favourites.splice(favIndex, 1);
	}
	return _state;
  })
);
