import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IonIcon } from '@ionic/angular/standalone';

import { Product } from 'src/app/interfaces/product';
import { addProduct } from 'src/app/store/cart/cart.actions';
import { addIcons } from 'ionicons';
import { cartOutline, heartOutline } from 'ionicons/icons';
import { addRemoveFavourite } from 'src/app/store/products/products.actions';
import { Observable } from 'rxjs';
import { selectFavourites } from 'src/app/store/products/products.selectors';
import { IAppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-product-card',
  templateUrl: 'product-card.component.html',
  styleUrls: ['product-card.component.scss'],
  imports: [TitleCasePipe, IonIcon, NgClass],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  products$: Observable<Product[]>;
  isFavourite = false;

  constructor(private router: Router, private store: Store<IAppState>) {
    addIcons({ cartOutline, heartOutline });
  }

  ngOnInit(): void {
    this.products$ = this.store.select(selectFavourites);
    this.products$.subscribe((favourites) => {
		this.isFavourite = (favourites.findIndex(prod => prod.id === this.product.id) !== -1);
    });
  }

  goToProductDetails() {
    this.router.navigate(['/product/' + this.product.id], {});
  }

  addProductToCart() {
    this.store.dispatch(addProduct({ product: this.product }));
  }

  likeProduct() {
    this.store.dispatch(addRemoveFavourite({ productId: this.product.id }));
  }
}
