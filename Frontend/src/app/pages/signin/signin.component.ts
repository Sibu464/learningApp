import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  user:string ='';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.router.navigate(['/home-page']); // Redirect to profile if already logged in
    }
  }

  onSubmit(): void {
    this.spinner.show();
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);

    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
       
       
        this.router.navigate(['/home-page']); // Redirect to profile upon successful login
      },
      error: err => {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Information',
          text: 'Wrong username or password!',
          confirmButtonText: 'OK',
          confirmButtonColor:'blue'
       
        
        });
        this.spinner.hide();
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  onLogoClick(){
    this.router.navigate(["/landing-page"])
  }
}
