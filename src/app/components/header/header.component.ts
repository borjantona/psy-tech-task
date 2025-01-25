import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { IonHeader, IonBadge } from '@ionic/angular/standalone';
import { IonIcon } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { addIcons } from 'ionicons';
import { cartOutline, menuOutline } from 'ionicons/icons';
import { filter, map, Observable } from 'rxjs';
import { NgClass } from '@angular/common';
import { Category } from 'src/app/interfaces/product';
import { IAppState } from 'src/app/store/app.state';
import { selectCartTotal } from 'src/app/store/cart/cart.selectors';
import { selectCategories } from 'src/app/store/products/products.selectors';
import { DecodeUriPipe } from 'src/app/pipes/decode-uri.pipe';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  imports: [
    IonHeader,
    IonIcon,
    NgClass,
    RouterModule,
    AsyncPipe,
    IonBadge,
	TitleCasePipe,
	DecodeUriPipe
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
