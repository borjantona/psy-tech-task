import { createReducer, on } from '@ngrx/store';
import { Cart } from 'src/app/interfaces/cart';
import { addProduct, cleanCart, loadCart, removeAllProducts, removeProduct } from './cart.actions';
import _ from 'lodash';

const initialState: Cart = {
  id: 0,
  products: [],
  date: Date.now().toString(),
  userId: 1,
};

export const cartReducer = createReducer(
  initialState,
  on(addProduct, (state, action) => {
	let _state = _.cloneDeep(state);
	const productIndex = _state.products.findIndex((product) => product.productId === action.product.id);
	if (productIndex !== -1) {
		_state.products[productIndex].quantity++;
	} else {
		_state.products.push({ productId: action.product.id, quantity: 1 });
	}
    return _state;
  }),
  on(removeProduct, (state, action) => {
	let _state = _.cloneDeep(state)
	const productIndex = _state.products.findIndex((product) => product.productId === action.productId);
	
	if (productIndex === -1) {
		return state;
	} else {
		if (_state.products[productIndex].quantity > 1) {
			_state.products[productIndex].quantity--;
		} else {
			_state.products.splice(productIndex, 1);
		}
	}
    return _state;
  }),
  on(removeAllProducts, (state, action) => {
	let _state = _.cloneDeep(state)
	const productIndex = _state.products.findIndex((product) => product.productId === action.productId);
	
	if (productIndex === -1) {
		return state;
	} else {
		_state.products.splice(productIndex, 1);
	}
    return _state;
  }),
  on(cleanCart, (state) => {
	let _state = _.cloneDeep(state)
	_state.products = [];
	return _state;
  }),
  on(loadCart, (state, action) => {
	let _state = _.cloneDeep(state)
	_state = action.cart;
	return _state;
  })
);
