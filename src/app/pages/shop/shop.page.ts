import { DecimalPipe, NgClass } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
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
import { toastShow } from 'src/app/store/alerts/alerts.actions';

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
	NgClass
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
  formPaymentData: {
	card: string;
    expirationDate: string;
    cvv: string;
	name: string;
  } = {
	card: '',
	expirationDate: '',
	cvv: '',
	name: ''
  }
  formDeliverySubmitted = false;
  formDeliveryValid = false;
  formPaymentSubmitted = false;

  step: number = 1;
  steps = {
	DELIVERY: 1,
	PAYMENT: 2
  };

  @ViewChildren(StyledInputComponent) inputs!: QueryList<StyledInputComponent>;

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
    const arrivalDate = new Date();
    this.arrival = `Arrives before ${arrivalDate.getDate()} ${arrivalDate.toLocaleString(
      'en',
      {
        month: 'long',
      }
    )}`;
  }

  updatePrice(): void {
    this.totalPrice = this.cart.products.reduce((total, cartProd) => {
      const prod = this.products.find((p) => p.id === cartProd.productId);
      if (prod) {
        total += prod.price * cartProd.quantity;
      }
      return total;
    }, 0);
  }

  submitForm(): void {
	this.formIsValid();
	this.formDeliverySubmitted = true;
	if (this.formDeliveryValid) {
		this.step = this.steps.PAYMENT;
	}
  }

  formIsValid(): boolean {
	this.formDeliverySubmitted = false;
	let isValid = true;
	this.inputs.forEach(input => {
		isValid &&= input.isValid();
	})
	this.formDeliveryValid = isValid;
	return isValid;
  }

  submitPaymentForm(): void {
	this.formPaymentSubmitted = true;
	if (this.formIsValid()) {
		this.store.dispatch(toastShow({message: 'Payment successfull'}));
	}
  }

  goToDeliveryOptions(): void {
	this.step = this.steps.DELIVERY;
  }
}
