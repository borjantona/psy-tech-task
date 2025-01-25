import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Product } from 'src/app/interfaces/product';
import { IAppState } from 'src/app/store/app.state';
import { CartProduct } from 'src/app/interfaces/cart';
import { removeAllProducts, removeProduct } from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'product-summary-checkout',
  templateUrl: 'product-summary-checkout.component.html',
  styleUrls: ['product-summary-checkout.component.scss'],
  imports: [],
})
export class ProductSummaryCheckoutComponent implements OnInit {
  @Input() cartProduct: CartProduct;
  @Input() products: Product[];
  product: Product;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.product = this.products.find(
      (prod) => prod.id === this.cartProduct?.productId
    )!;
  }

  removeProduct() {
	this.store.dispatch(removeAllProducts({productId: this.product.id}))
  }
  decreaseQuantity() {
	this.store.dispatch(removeProduct({productId: this.product.id}))
  }
  likeProduct() {}
}
