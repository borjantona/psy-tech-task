import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.component.html',
  styleUrls: ['product-card.component.scss'],
  imports: [
  ],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  constructor(private router: Router) {}

  ngOnInit() {
	//console.log(this.product)
  }

  goToProductDetails() {
	this.router.navigate(['/product/'+this.product.id], {});
  }
}
