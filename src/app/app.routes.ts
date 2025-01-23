import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'shop',
    loadComponent: () => import('./shop/shop.page').then((m) => m.ShopPage),
  },
  {
    path: 'product',
    loadComponent: () => import('./product/product.page').then((m) => m.ProductPage),
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.page').then((m) => m.CartPage),
  },
  {
    path: 'category',
    loadComponent: () => import('./category/category.page').then((m) => m.CategoryPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
