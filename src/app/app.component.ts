import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { HeaderComponent } from './components/header/header.component';
import { Store } from '@ngrx/store';
import { IAppState } from './store/app.state';
import { initCart } from './store/cart/cart.actions';
import { getCategories, getProducts } from './store/products/products.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, HeaderComponent],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
	let userId = 1;
	localStorage.setItem('userId', userId.toString());
	this.store.dispatch(initCart({ userId }));
	this.store.dispatch(getProducts());
	this.store.dispatch(getCategories());
  }
}
