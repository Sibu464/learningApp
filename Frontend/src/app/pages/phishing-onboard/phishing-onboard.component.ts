import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-phishing-onboard',
  templateUrl: './phishing-onboard.component.html',
  styleUrls: ['./phishing-onboard.component.scss']
})
export class PhishingOnboardComponent implements OnInit {
  isLoggedIn = false;
  flippedStates: boolean[] = [false, false, false]; // Array to keep track of which card is flipped

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (!this.isLoggedIn) {
        this.router.navigate(['/signin']);
      }
    });
  }

  // Method to flip a specific card based on its index
  flipCard(index: number) {
    // Set all cards to false first
    this.flippedStates = this.flippedStates.map((flipped, i) => i === index ? !flipped : false);
  }

  funcT() {
    this.router.navigate(['/game']);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.isLoggedIn = false,
      error: err => console.error(err)
    });
  }
}
