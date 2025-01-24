import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ApiFetcherService } from 'src/app/services/apiFetcher';
import { Product } from 'src/app/interfaces/product';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';

@Component({
  selector: 'app-category',
  templateUrl: 'category.page.html',
  styleUrls: ['category.page.scss'],
  imports: [IonContent, ProductCardComponent],
})
export class CategoryPage implements OnInit {
  category = '';
  products: Product[] = [];
  constructor(
    private apiFetcherService: ApiFetcherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.category = this.route.snapshot.params['cat'];
    this.loadCategoryProducts();
  }

  loadCategoryProducts() {
    this.apiFetcherService
      .getCategory(this.category)
      .then((products: Product[]) => {
        this.products = products;
      });
  }
}
