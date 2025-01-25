import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Category, Product } from 'src/app/interfaces/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'products-slider',
  templateUrl: 'products-slider.component.html',
  styleUrls: ['products-slider.component.scss'],
  imports: [ProductCardComponent],
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
	  modules: [Navigation, Pagination],
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
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
	  /*pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },*/
    });
  }
}
