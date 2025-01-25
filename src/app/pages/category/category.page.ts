import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { IAppState, ProductStore } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { selectProducts } from 'src/app/store/products/products.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-category',
  templateUrl: 'category.page.html',
  styleUrls: ['category.page.scss'],
  imports: [IonContent, ProductCardComponent],
})
export class CategoryPage {
  category = '';
  products: Product[] = [];
  products$: Observable<Product[]>;

  constructor(
    private route: ActivatedRoute,
	private store: Store<IAppState>
  ) {
	this.category = this.route.snapshot.params['cat'];
    this.products$ = store.select(selectProducts);
    this.products$.subscribe((products) => {
		this.products = products.filter((prod) => prod.category === this.category)
    });
  }
}
