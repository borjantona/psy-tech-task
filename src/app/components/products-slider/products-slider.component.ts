import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { Category, Product } from 'src/app/interfaces/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgClass } from '@angular/common';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'products-slider',
  templateUrl: 'products-slider.component.html',
  styleUrls: ['products-slider.component.scss'],
  imports: [ProductCardComponent, NgClass, IonButton, IonIcon],
})
export class ProductsSliderComponent implements OnInit, AfterViewInit {
  @Input() products: Product[] = [];
  swiper: Swiper;
  @Input() category: Category;
  innerProducts: Product[] = [];

  constructor() {
	addIcons({ chevronBackOutline, chevronForwardOutline });
  }

  ngOnInit() {
    if (this.category !== undefined) {
      this.innerProducts = this.products.filter(
        (product) => product.category === this.category
      );
    }
  }

  ngAfterViewInit() {
    this.initSwiper();
  }

  initSwiper() {
    this.swiper = new Swiper('.swiper', {
      // Optional parameters
      observer: true,
      observeParents: true,
      direction: 'horizontal',
      slidesPerView: 1,
      breakpoints: {
        1400: {
          slidesPerView: 5,
        },
        1250: {
          slidesPerView: 4,
        },
        900: {
          slidesPerView: 3,
        },
        500: {
          slidesPerView: 2,
        },
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
