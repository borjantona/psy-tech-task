import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Product } from 'src/app/interfaces/product';
import { IAppState } from 'src/app/store/app.state';
import { CartProduct } from 'src/app/interfaces/cart';
import {
  removeAllProducts,
  removeProduct,
} from 'src/app/store/cart/cart.actions';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-summary-checkout',
  templateUrl: 'product-summary-checkout.component.html',
  styleUrls: ['product-summary-checkout.component.scss'],
  imports: [TitleCasePipe],
})
export class ProductSummaryCheckoutComponent implements OnInit {
  @Input() cartProduct: CartProduct;
  @Input() products: Product[];
  product: Product;

  constructor(private store: Store<IAppState>, private router: Router) {}

  ngOnInit(): void {
    this.product = this.products.find(
      (prod) => prod.id === this.cartProduct?.productId
    )!;
  }

  goToProductDetails() {
    this.router.navigate(['/product/' + this.product.id], {});
  }

}
