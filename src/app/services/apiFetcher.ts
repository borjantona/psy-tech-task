import { Injectable } from '@angular/core';
import { Category, Product } from '../interfaces/product';
import { Cart, CartProduct } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class ApiFetcherService {
  constructor() {}

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await fetch(APIS.URL_BASE + APIS.PRODUCTS);
      return await products.json();
    } catch (e) {
      console.log(e);
      throw new Error('API Error');
    }
  }

  async getProduct(id: number): Promise<Product> {
    try {
      const product = await fetch(APIS.URL_BASE + APIS.PRODUCT + id);
      return await product.json();
    } catch (e) {
      console.log(e);
      throw new Error('API Error');
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const categories = await fetch(APIS.URL_BASE + APIS.CATEGORIES);
      return await categories.json();
    } catch (e) {
      console.log(e);
      throw new Error('API Error');
    }
  }

  async getCategory(category: string): Promise<Product[]> {
    try {
      const categories = await fetch(APIS.URL_BASE + APIS.CATEGORY + category);
      return await categories.json();
    } catch (e) {
      console.log(e);
      throw new Error('API Error');
    }
  }

  async getCart(id: number): Promise<Cart> {
    try {
      const categories = await fetch(APIS.URL_BASE + APIS.CART + id);
      return await categories.json();
    } catch (e) {
      console.log(e);
      throw new Error('API Error');
    }
  }

  async getUserCarts(id: number): Promise<Cart[]> {
    try {
      const categories = await fetch(APIS.URL_BASE + APIS.USER_CART + id);
      return await categories.json();
    } catch (e) {
      console.log(e);
      throw new Error('API Error');
    }
  }

  async addNewCart(cart: Cart): Promise<Response> {
    try {
      const response = await fetch(APIS.URL_BASE + APIS.ADD_CART, {
        method: 'POST',
        body: JSON.stringify(cart),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw new Error('API Error');
    }
  }

  async createCart(cart: Cart): Promise<Cart> {
    try {
      const response = await fetch(APIS.URL_BASE + APIS.ADD_CART, {
        method: 'POST',
        body: JSON.stringify(cart),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw new Error('API Error');
    }
  }

  async updateProductInCart(
    id: number,
    cartSlice: { userId: number; date: string; products: CartProduct[] }
  ): Promise<Response> {
    try {
      const response = await fetch(APIS.URL_BASE + APIS.UPDATE_PRODUCT + id, {
        method: 'PUT',
        body: JSON.stringify(cartSlice),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw new Error('API Error');
    }
  }

  async deleteCart(id: number): Promise<Response> {
    try {
      const response = await fetch(APIS.URL_BASE + APIS.DELETE_CART + id, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw new Error('API Error');
    }
  }
}

export const enum APIS {
  URL_BASE = 'https://fakestoreapi.com/',
  CATEGORIES = 'products/categories',
  CATEGORY = 'products/category/',
  PRODUCTS = 'products',
  PRODUCT = 'products/',
  CART = 'carts/',
  USER_CART = 'carts/user/',
  ADD_CART = 'carts',
  UPDATE_PRODUCT = 'carts/',
  DELETE_CART = 'carts/',
}
