import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { ApiFetcherService } from 'src/app/services/apiFetcher';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent],
})
export class HomePage {
  constructor(private apiService: ApiFetcherService) {
    
  }
}
