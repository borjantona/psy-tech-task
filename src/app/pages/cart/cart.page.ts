import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductCheckoutCardComponent } from 'src/app/components/product-checkout-card/product-checkout-card.component';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { IAppState, ProductStore } from 'src/app/store/app.state';
import { selectCart } from 'src/app/store/cart/cart.selectors';
import { selectProductsStore } from 'src/app/store/products/products.selectors';
import { StyledButtonComponent } from "../../components/elements/styled-button/styled-button.component";
import { ProductCardComponent } from "../../components/product-card/product-card.component";

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss'],
  imports: [IonContent, ProductCheckoutCardComponent, DecimalPipe, StyledButtonComponent, ProductCardComponent],
})
export class CartPage implements OnInit {
  cart$: Observable<Cart>;
  cart: Cart = {
	date: '',
	userId: 0,
	products: [],
  };
  totalPrice: number;
  products$: Observable<ProductStore>;
  products: Product[] = [];
  favourites: Product[] = [];

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.cart$ = this.store.select(selectCart);
    this.cart$.subscribe((cart) => {
      this.cart = cart;
	  this.updatePrice();
    });
    this.products$ = this.store.select(selectProductsStore);
    this.products$.subscribe((productsStore) => {
      this.products = productsStore.products;
      this.favourites = productsStore.favourites;
	  this.updatePrice();
    });
  }

  updatePrice(): void {
	this.totalPrice = this.cart.products.reduce(
	  (sum, product) => sum + product.quantity * this.getProductPrice(product.productId),
	  0
	);
  }
  
  getProductPrice(productId: number): number {
	const product = this.products.find((p) => p.id === productId);
	return product ? product.price : 0;
  }
  
}
