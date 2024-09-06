import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(): boolean {
    if (this.storageService.isLoggedIn() && this.storageService.getUserRole().includes('admin')) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      alert('You must be an admin to access this page.');
      return false;
    }
  }
}
