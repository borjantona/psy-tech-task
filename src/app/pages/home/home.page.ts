import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { ApiFetcherService } from 'src/app/services/apiFetcher';
import { Category, Product } from 'src/app/interfaces/product';
import { ProductsSliderComponent } from 'src/app/components/products-slider/products-slider.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState, ProductStore } from 'src/app/store/app.state';
import { selectProducts } from 'src/app/store/products/products.selectors';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, ProductsSliderComponent],
})
export class HomePage {
  products$: Observable<ProductStore>;
  products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private apiService: ApiFetcherService,
    private store: Store<IAppState>
  ) {
    this.products$ = store.select(selectProducts);
    this.products$.subscribe((productStore) => {
      this.products = productStore.products;
	  this.categories = productStore.categories;
    });
  }
}
