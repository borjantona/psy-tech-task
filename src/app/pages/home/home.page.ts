import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { ApiFetcherService } from 'src/app/services/apiFetcher';
import { Category, Product } from 'src/app/interfaces/product';
import { ProductsSliderComponent } from 'src/app/components/products-slider/products-slider.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonContent,
    ProductsSliderComponent
  ],
})
export class HomePage {

  products: Product[] = [];
  categories: Category[] = [];

  constructor(private apiService: ApiFetcherService) {
    const productsFetch = this.apiService.getAllProducts();
	const categoriesFetch = this.apiService.getCategories();
    productsFetch.then((data) => {
      this.products = data;
    });
	categoriesFetch.then((data) => {
		this.categories = data;
	});
  }
  
  
}
