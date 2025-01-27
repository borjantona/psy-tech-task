import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductSummaryCheckoutComponent } from 'src/app/components/product-summary-checkout/product-summary-checkout.component';
import { StyledInputComponent } from 'src/app/components/elements/styled-input/styled-input.component';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { IAppState } from 'src/app/store/app.state';
import { selectCart } from 'src/app/store/cart/cart.selectors';
import { selectProducts } from 'src/app/store/products/products.selectors';
import { StyledButtonComponent } from '../../components/elements/styled-button/styled-button.component';

@Component({
  selector: 'app-shop',
  templateUrl: 'shop.page.html',
  styleUrls: ['shop.page.scss'],
  imports: [
    IonContent,
    DecimalPipe,
    ProductSummaryCheckoutComponent,
    FormsModule,
    StyledInputComponent,
    StyledButtonComponent,
  ],
})
export class ShopPage implements OnInit {
  cart$: Observable<Cart>;
  cart: Cart;
  totalPrice: number;
  products$: Observable<Product[]>;
  products: Product[] = [];
  arrival: string;
  formDeliveryData: {
    name: string;
    lastName: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    email: string;
    phone: string;
  } = {
    name: '',
    lastName: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    email: '',
    phone: '',
  };
  formSubmitted = false;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.cart$ = this.store.select(selectCart);
    this.cart$.subscribe((cart) => {
      this.cart = cart;
      this.updatePrice();
    });
    this.products$ = this.store.select(selectProducts);
    this.products$.subscribe((products) => {
      this.products = products;
      this.updatePrice();
    });
    let arrivalDate = new Date();
    this.arrival = `Arrives before ${arrivalDate.getDate()} ${arrivalDate.toLocaleString(
      'en',
      {
        month: 'long',
      }
    )}`;
  }

  updatePrice() {
    this.totalPrice = this.cart.products.reduce((total, cartProd) => {
      const prod = this.products.find((p) => p.id === cartProd.productId);
      if (prod) {
        total += prod.price * cartProd.quantity;
      }
      return total;
    }, 0);
  }

  submitForm() {
    this.formSubmitted = true;
  }
}
