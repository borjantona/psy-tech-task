import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/shop/shop.page').then((m) => m.ShopPage),
  },
  {
    path: 'product',
	redirectTo: 'home'
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product/product.page').then((m) => m.ProductPage),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.page').then((m) => m.CartPage),
  },
  {
    path: 'category',
    redirectTo: 'home',
  },
  {
    path: 'category/:cat',
    loadComponent: () => import('./pages/category/category.page').then((m) => m.CategoryPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
