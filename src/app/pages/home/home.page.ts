import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { Category, Product } from 'src/app/interfaces/product';
import { ProductsSliderComponent } from 'src/app/components/products-slider/products-slider.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState, ProductStore } from 'src/app/store/app.state';
import { selectProductsStore } from 'src/app/store/products/products.selectors';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, ProductsSliderComponent],
})
export class HomePage implements OnInit {
  products$: Observable<ProductStore>;
  products: Product[] = [];
  categories: Category[] = [];

  constructor(public store: Store<IAppState>) {}

  ngOnInit(): void {
	this.products$ = this.store.select(selectProductsStore);
    this.products$.subscribe((productStore) => {
      this.products = productStore.products;
	  this.categories = productStore.categories;
    });
  }
}
