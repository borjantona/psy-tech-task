import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonToast } from '@ionic/angular/standalone';
import { HeaderComponent } from './components/header/header.component';
import { Store } from '@ngrx/store';
import { IAppState } from './store/app.state';
import { initCart } from './store/cart/cart.actions';
import { getCategories, getProducts } from './store/products/products.actions';
import { Observable } from 'rxjs';
import { Alert } from './interfaces/alerts';
import { selectAlert } from './store/alerts/alerts.selectors';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, HeaderComponent, IonToast],
})
export class AppComponent implements OnInit {
	alert$: Observable<Alert>;
  isToastOpen = false;
  toastMsg = '';

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    let userId = 1;
	this.alert$ = this.store.select(selectAlert);
    localStorage.setItem('userId', userId.toString());
    this.store.dispatch(initCart({ userId }));
    this.store.dispatch(getProducts());
    this.store.dispatch(getCategories());

	this.alert$.subscribe((alert) => {
		this.isToastOpen = alert.open;
		this.toastMsg = alert.message;
	})
  }
  openToast(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
