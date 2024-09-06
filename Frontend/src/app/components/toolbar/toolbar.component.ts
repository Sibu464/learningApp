import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isDropdownOpen = false;
  isSidebarOpen = false;
  isLoggedIn = false;
  isAuthPage = false;
  roles: string[] = [];
  showUserBoard = false;
  showEmployerBoard = false;
  showAdminBoard = false;
  isEmployer: boolean = false;
  userId: any;
  userData: any;
  isToolBar!: boolean;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.storageService.getUserRole() == "ROLE_EMPLOYER") {
      this.isEmployer = true;
    }
    
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      this.isAuthPage = currentUrl.includes('/signin') || currentUrl.includes('/signup')|| currentUrl.includes('/quiz');
    });

    this.userData = this.storageService.getUser();
    this.userId = this.userData.id;

    this.authService.authState.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (this.isLoggedIn) {
        const user = this.storageService.getUser();
        this.roles = user.roles;

        this.showUserBoard = this.roles.includes('ROLE_EMPLOYEE');
        this.showEmployerBoard = this.roles.includes('ROLE_EMPLOYER');
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      } else {
        this.roles = [];
        this.showUserBoard = false;
        this.showEmployerBoard = false;
        this.showAdminBoard = false;
      }
    });
  }

  toggleDropdown() { 
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onProfileIconClick() {
    if (this.isLoggedIn) {
      this.logout();
    } else {
      this.router.navigate(['/signin']);
    }
  }

  onLogoClick() {
    this.router.navigate(["/landing-page"]);
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

  navigateToEmployerPages(page: string) {
    this.router.navigate([`/${page}/${this.userId}`]);
    this.closeDropdown(); // Close dropdown after navigation
  }
 
 
}
