import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Validation from 'src/app/utils/validation';
import { NgxSpinnerService } from "ngx-spinner";
import { StorageService } from 'src/app/services/storage.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: any;
  isLoginFailed: boolean | undefined;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,private spinner: NgxSpinnerService,private storageService:StorageService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: Validation.match('password', 'confirmPassword')
      }
    );
  }

  onSubmit(): void {
    this.spinner.show();
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;
      const roles = ['employer'];
      this.authService.register(username, email, password,roles).subscribe({
        next: data => {
         this.spinner.hide();
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          
          this.authService.login(username, password).subscribe({
            next: data => {
              
      
            
              this.roles = this.storageService.getUser().roles;
             
          
            },
            error: err => {
              this.errorMessage = err.error.message;
              this.isLoginFailed = true;
            }
          });
          this.router.navigate(['/home-page']); // Redirect to profile upon successful login
        },
        error: err => {
          this.spinner.hide();
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    }
  }
  onLogoClick(){
    this.router.navigate(["/landing-page"])
  }
}

