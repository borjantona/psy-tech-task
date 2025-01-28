import { Component, Input, OnInit } from '@angular/core';

import { Product } from 'src/app/interfaces/product';
import { CartProduct } from 'src/app/interfaces/cart';
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.product = this.products.find(
      (prod) => prod.id === this.cartProduct?.productId
    )!;
  }

  goToProductDetails() {
    this.router.navigate(['/product/' + this.product.id], {});
  }

}
