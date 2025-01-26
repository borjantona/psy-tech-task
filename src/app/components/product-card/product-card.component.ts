import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Product } from 'src/app/interfaces/product';
import { addProduct } from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.component.html',
  styleUrls: ['product-card.component.scss'],
  imports: [TitleCasePipe],
})
export class ProductCardComponent {
  @Input() product: Product;

  constructor(private router: Router, private store: Store) {}


  goToProductDetails() {
	this.router.navigate(['/product/'+this.product.id], {});
  }

  addProductToCart() {
	this.store.dispatch(addProduct({ product: this.product }));
  }
}
