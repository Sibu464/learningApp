import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-spearphishing-scenario-page',
  templateUrl: './spearphishing-scenario-page.component.html',
  styleUrls: ['./spearphishing-scenario-page.component.scss']
})
export class SpearphishingScenarioPageComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (!this.isLoggedIn) {
        const user = this.storageService.getUser();
      }
    });
  }

  navigateToPhishingOnboard() {

    this.router.navigate(['/phishing-onboard']);
  }

  onProfileIconClick() {
    if (this.isLoggedIn) {
      this.logout();
    } else {
      this.navigateToSignIn();
    }
  }

  navigateToSignIn() {
    this.router.navigate(['/signin']);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
