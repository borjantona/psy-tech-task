import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductCheckoutCardComponent } from 'src/app/components/product-checkout-card/product-checkout-card.component';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { IAppState } from 'src/app/store/app.state';
import { selectCart } from 'src/app/store/cart/cart.selectors';
import { selectProducts } from 'src/app/store/products/products.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss'],
  imports: [IonContent, IonButton, ProductCheckoutCardComponent, DecimalPipe, RouterModule],
})
export class CartPage implements OnInit {
  cart$: Observable<Cart>;
  cart: Cart;
  totalPrice: number;
  products$: Observable<Product[]>;
  products: Product[] = [];

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.cart$ = this.store.select(selectCart);
    this.cart$.subscribe((cart) => {
      this.cart = cart;
	  if (this.products) {
		this.totalPrice = this.cart.products.reduce((total, cartProd) => {
			const prod = this.products.find((p) => p.id === cartProd.productId);
			if (prod) {
				total += prod.price*cartProd.quantity;
			}
			return total;
		}, 0)
	  }
    });
    this.products$ = this.store.select(selectProducts);
    this.products$.subscribe((products) => {
      this.products = products;
    });
  }
  
}
