import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { IAppState, ProductStore } from 'src/app/store/app.state';
import { addProduct } from 'src/app/store/cart/cart.actions';
import { selectProductsStore } from 'src/app/store/products/products.selectors';
import { StyledButtonComponent } from '../../components/elements/styled-button/styled-button.component';
import { TitleCasePipe } from '@angular/common';
import { addRemoveFavourite } from 'src/app/store/products/products.actions';

@Component({
  selector: 'app-product',
  templateUrl: 'product.page.html',
  styleUrls: ['product.page.scss'],
  imports: [IonContent, StyledButtonComponent, TitleCasePipe],
})
export class ProductPage implements OnInit {
  productId: number;
  product: Product;
  products: Product[] = [];
  products$: Observable<ProductStore>;
  isFavourite = false;

  constructor(private route: ActivatedRoute, private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.params['id'];
    this.products$ = this.store.select(selectProductsStore);
    this.products$.subscribe((productStore) => {
      this.product = productStore.products.find(
        (prod) => prod.id === this.productId
      )!;
      this.isFavourite =
        productStore.favourites.findIndex(
          (prod) => prod.id === this.product.id
        ) !== -1;
    });
  }

  addToCart(): void {
    this.store.dispatch(addProduct({ product: this.product }));
  }
  likeProduct(): void {
    this.store.dispatch(addRemoveFavourite({ productId: this.product.id }));
  }
}
