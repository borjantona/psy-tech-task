import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-shop',
  templateUrl: 'shop.page.html',
  styleUrls: ['shop.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class ShopPage {
  constructor() {}
}
