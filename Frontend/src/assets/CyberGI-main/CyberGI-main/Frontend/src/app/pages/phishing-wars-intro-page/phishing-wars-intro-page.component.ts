import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phishing-wars-intro-page',
  templateUrl: './phishing-wars-intro-page.component.html',
  styleUrls: ['./phishing-wars-intro-page.component.scss']
})
export class PhishingWarsIntroPageComponent {

  constructor(private router: Router){

  }

navigateToPhishingWars() {
  this.router.navigate(['phishing-scenario-page']);
}
 

}
