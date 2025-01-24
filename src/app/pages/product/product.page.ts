import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { Category, Product } from 'src/app/interfaces/product';
import { ApiFetcherService } from 'src/app/services/apiFetcher';

@Component({
  selector: 'app-product',
  templateUrl: 'product.page.html',
  styleUrls: ['product.page.scss'],
  imports: [IonContent, IonButton],
})
export class ProductPage {
  productId: number;
  product: Product;
  constructor(
    private apiFetcherService: ApiFetcherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    this.loadProduct();
  }

  addToCart() {
    console.log('Product added to cart');
  }

  loadProduct() {
    this.apiFetcherService
      .getProduct(this.productId)
      .then((product: Product) => {
        this.product = product;
      });
  }
}
