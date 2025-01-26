import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { IAppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { selectProducts } from 'src/app/store/products/products.selectors';
import { Store } from '@ngrx/store';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: 'category.page.html',
  styleUrls: ['category.page.scss'],
  imports: [IonContent, ProductCardComponent, TitleCasePipe],
})
export class CategoryPage implements OnInit {
  category = '';
  products: Product[] = [];
  products$: Observable<Product[]>;

  constructor(private route: ActivatedRoute, private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.params['cat'];
    this.products$ = this.store.select(selectProducts);
    this.products$.subscribe((products) => {
      this.products = products.filter(
        (prod) => prod.category === this.category
      );
    });
  }
}
