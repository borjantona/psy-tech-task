import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IonIcon } from '@ionic/angular/standalone'

import { Product } from 'src/app/interfaces/product';
import { addProduct } from 'src/app/store/cart/cart.actions';
import { addIcons } from 'ionicons';
import { cartOutline, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.component.html',
  styleUrls: ['product-card.component.scss'],
  imports: [TitleCasePipe, IonIcon],
})
export class ProductCardComponent {
  @Input() product: Product;

  constructor(private router: Router, private store: Store) {
		addIcons({ cartOutline, heartOutline });
  }


  goToProductDetails() {
	this.router.navigate(['/product/'+this.product.id], {});
  }

  addProductToCart() {
	this.store.dispatch(addProduct({ product: this.product }));
  }

  likeProduct() {
	
  }
}
