import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';


@Component({
	selector: 'app-styled-button',
	templateUrl: './styled-button.component.html',
	styleUrls: ['./styled-button.component.scss'],
	imports: [IonButton, RouterModule]
})
export class StyledButtonComponent {
	@Input() text = '';
	@Input() color = 'primary';
	@Input() link: string;

	constructor() {}
}