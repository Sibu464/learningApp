import { Component } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  navigateTo() {
    this.router.navigate(['/landing-page']);
  }
  navigateToL() {
    this.router.navigate(['/learn']);
  }
 
  navigateToQ() {
    this.router.navigate(['/quiz']);
  }

  navigateToP() {
    this.router.navigate(['/profile']);
  }

}
