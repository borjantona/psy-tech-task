import { Component } from '@angular/core';
import { IonHeader  } from '@ionic/angular/standalone';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cartOutline, menuOutline } from 'ionicons/icons';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  imports: [IonHeader, IonIcon, IonCol, IonGrid, IonRow ],
})
export class HeaderComponent {
  constructor() {
	addIcons({ cartOutline, menuOutline });
  }

  handleOnClick(ev: Event) {
	console.log(ev);
  }
}
