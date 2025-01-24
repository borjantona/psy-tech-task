import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {
	console.log(this.product)
  }
}
