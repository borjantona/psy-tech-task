import { createReducer, on } from '@ngrx/store';
import _ from 'lodash';
import { toastClose, toastShow } from './alerts.actions';
import { Alert } from 'src/app/interfaces/alerts';

const initialState: Alert = {
  message: '',
  open: false
};

export const alertReducer = createReducer(
  initialState,
  on(toastShow, (state, action) => {
	const _state = _.cloneDeep(state);
	_state.open = true;
	_state.message = action.message;
	return _state;
  }),
  on(toastClose, (state) => {
	const _state = _.cloneDeep(state)
	_state.open = false;
	_state.message = '';
	return _state;
  })
);
