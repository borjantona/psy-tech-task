import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import Swiper from 'swiper';
import { Category, Product } from 'src/app/interfaces/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { Navigation, Pagination } from 'swiper/modules';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'products-slider',
  templateUrl: 'products-slider.component.html',
  styleUrls: ['products-slider.component.scss'],
  imports: [ProductCardComponent, TitleCasePipe],
})
export class ProductsSliderComponent
  implements OnInit, AfterViewInit, OnChanges
{
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

  ngOnChanges(changes: SimpleChanges) {
	console.log(changes)
    if (changes['products']) {
		if (this.swiper) {
			console.log(this.swiper)

		}
    }
  }

  initSwiper() {
    this.swiper = new Swiper('.swiper', {
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
        675: {
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
