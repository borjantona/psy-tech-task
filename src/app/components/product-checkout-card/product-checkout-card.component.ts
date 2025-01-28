import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IonIcon } from '@ionic/angular/standalone';

import { Product } from 'src/app/interfaces/product';
import { addIcons } from 'ionicons';
import { heart, heartOutline, trashOutline } from 'ionicons/icons';
import { IAppState } from 'src/app/store/app.state';
import { CartProduct } from 'src/app/interfaces/cart';
import {
  addProduct,
  removeAllProducts,
  removeProduct,
} from 'src/app/store/cart/cart.actions';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { addRemoveFavourite } from 'src/app/store/products/products.actions';
import { Observable } from 'rxjs';
import { selectFavourites } from 'src/app/store/products/products.selectors';

@Component({
  selector: 'app-product-checkout-card',
  templateUrl: 'product-checkout-card.component.html',
  styleUrls: ['product-checkout-card.component.scss'],
  imports: [IonIcon, TitleCasePipe],
})
export class ProductCheckoutCardComponent implements OnInit {
  @Input() cartProduct: CartProduct;
  @Input() products: Product[];
  product: Product;
  products$: Observable<Product[]>;
  isFavourite = false;

  constructor(private store: Store<IAppState>, private router: Router) {
    addIcons({ trashOutline, heartOutline, heart });
  }

  ngOnInit(): void {
    this.product = this.products.find(
      (prod) => prod.id === this.cartProduct?.productId
    )!;
    this.products$ = this.store.select(selectFavourites);
    this.products$.subscribe((favourites) => {
      this.isFavourite =
        favourites.findIndex((prod) => prod.id === this.product.id) !== -1;
    });
  }

  goToProductDetails(): void {
    this.router.navigate(['/product/' + this.product.id], {});
  }

  removeProduct(): void {
    this.store.dispatch(removeAllProducts({ productId: this.product.id }));
  }
  addQuantity(): void {
    this.store.dispatch(addProduct({ product: this.product }));
  }
  decreaseQuantity(): void {
    this.store.dispatch(removeProduct({ productId: this.product.id }));
  }
  likeProduct(): void {
    this.store.dispatch(addRemoveFavourite({ productId: this.product.id }));
  }
}
