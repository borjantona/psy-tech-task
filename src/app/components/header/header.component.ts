import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { IonHeader, IonChip, IonBadge } from '@ionic/angular/standalone';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { IonIcon } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { addIcons } from 'ionicons';
import { cartOutline, menuOutline } from 'ionicons/icons';
import { filter, map, Observable } from 'rxjs';
import { Cart } from 'src/app/interfaces/cart';
import { Category } from 'src/app/interfaces/product';
import { IAppState, ProductStore } from 'src/app/store/app.state';
import { selectCartTotal } from 'src/app/store/cart/cart.selectors';
import { selectCategories, selectProducts } from 'src/app/store/products/products.selectors';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  imports: [
    IonHeader,
    IonIcon,
    IonCol,
    IonGrid,
    IonRow,
    RouterModule,
    IonChip,
    AsyncPipe,
    IonBadge,
	TitleCasePipe
  ],
})
export class HeaderComponent implements OnInit {
  url$: Observable<string> = new Observable<string>();
  url: string = '';
  cart$: Observable<number>;
  categories$: Observable<Category[]>;
  categories: Category[] = [];

  constructor(private router: Router, private store: Store<IAppState>) {
    addIcons({ cartOutline, menuOutline });
    this.url$ = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        return event.url;
      })
    );
    this.cart$ = store.select(selectCartTotal);

    this.categories$ = store.select(selectCategories);
    this.categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }

  ngOnInit() {
    this.url$.subscribe((url) => {
      this.url = url;
    });
  }

  handleOnClick(ev: Event) {}
}
