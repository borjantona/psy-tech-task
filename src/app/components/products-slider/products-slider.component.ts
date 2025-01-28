import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Swiper from 'swiper';
import { Category, Product } from 'src/app/interfaces/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { Navigation, Pagination } from 'swiper/modules';
import { NgClass, TitleCasePipe } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import _ from 'lodash';

@Component({
  selector: 'app-products-slider',
  templateUrl: 'products-slider.component.html',
  styleUrls: ['products-slider.component.scss'],
  imports: [ProductCardComponent, TitleCasePipe, IonIcon, NgClass],
})
export class ProductsSliderComponent implements OnInit, OnChanges {
  @Input() products: Product[] = [];
  swiper: Swiper;
  @Input() category: Category;
  innerProducts: Product[] = [];
  categoryClean: string = '';
  init = false;

  constructor() {
    addIcons({ chevronBackOutline, chevronForwardOutline });
  }

  ngOnInit(): void {
	this.getInnerProducts();
    setTimeout(() => {
      this.initSwiper();
    }, 200);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      if (this.swiper) {
        this.swiper.update();
      }
    }
  }

  getInnerProducts(): void {
    if (this.category !== undefined) {
      this.innerProducts = this.products.filter(
        (product) => product.category === this.category
      );
      this.categoryClean = this.category.replace(/[^a-zA-Z0-9]/g, '');
    } else {
      this.innerProducts = _.cloneDeep(this.products);
    }
  }

  initSwiper() {
    this.swiper = new Swiper('.swiper-' + this.categoryClean, {
      observer: true,
      observeParents: true,
      direction: 'horizontal',
      slidesPerView: 1,
      modules: [Navigation, Pagination],
      breakpoints: {
        1630: {
          slidesPerView: 5,
        },
        1250: {
          slidesPerView: 4,
        },
        1050: {
          slidesPerView: 3,
        },
        675: {
          slidesPerView: 2,
        },
      },
      navigation: {
        nextEl: '.swiper-button-next-' + this.categoryClean,
        prevEl: '.swiper-button-prev-' + this.categoryClean,
      },
    });
    this.init = true;
  }
}
