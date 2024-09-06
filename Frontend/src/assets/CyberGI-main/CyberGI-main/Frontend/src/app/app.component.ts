import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModuleServiceService } from './services/module-service.service';

import { Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showEmployerBoard = false;
  username?: string;
  showToolbar=true;

  constructor(private storageService: StorageService, private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showEmployerBoard = this.roles.includes('ROLE_MODERATOR');


      this.username = user.username;
    }
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateToolbarVisibility();
    });
this.updateToolbarVisibility();
  }
  updateToolbarVisibility(){
    const currentRoute=this.router.url;
    this.showToolbar=!currentRoute.includes('/game');
  }
  

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
      },
      error: err => {
        console.log(err);
      }
    });
    
    window.location.reload();
  }
}
