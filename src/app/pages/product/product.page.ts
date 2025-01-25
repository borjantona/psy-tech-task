import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { IAppState } from 'src/app/store/app.state';
import { addProduct } from 'src/app/store/cart/cart.actions';
import { selectProducts } from 'src/app/store/products/products.selectors';

@Component({
  selector: 'app-product',
  templateUrl: 'product.page.html',
  styleUrls: ['product.page.scss'],
  imports: [IonContent, IonButton],
})
export class ProductPage {
  productId: number;
  product: Product;
  products: Product[] = [];
  products$: Observable<Product[]>;

  constructor(private route: ActivatedRoute, private store: Store<IAppState>) {
    this.productId = +this.route.snapshot.params['id'];
    this.products$ = store.select(selectProducts);
    this.products$.subscribe((products) => {
      this.product = products.find((prod) => prod.id === this.productId)!;
    });
  }

  addToCart() {
	this.store.dispatch(addProduct({ product: this.product }));
  }
}
