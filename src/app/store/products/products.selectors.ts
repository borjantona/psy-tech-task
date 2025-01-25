import { IAppState } from '../app.state';

export const selectProductsStore = (state: IAppState) => state.products;
export const selectProducts = (state: IAppState) => state.products.products;
export const selectCategories = (state: IAppState) => state.products.categories;

