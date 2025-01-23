import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { IonHeader,IonChip  } from '@ionic/angular/standalone';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cartOutline, menuOutline } from 'ionicons/icons';
import { filter, map, Observable } from 'rxjs';



@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  imports: [IonHeader, IonIcon, IonCol, IonGrid, IonRow, RouterModule, IonChip ],
})
export class HeaderComponent implements OnInit {
	url$: Observable<string> = new Observable<string>();
	url: string = '';

  constructor(private router: Router) {
	addIcons({ cartOutline, menuOutline });
	this.url$ = this.router.events.pipe(
		filter((event: any) => event instanceof NavigationEnd),
		map((event: NavigationEnd) => {return event.url})
	  );
  }

  ngOnInit() {
	this.url$.subscribe((url) => {
		this.url = url;
	});
  }

  handleOnClick(ev: Event) {
	console.log(ev);
  }
}
