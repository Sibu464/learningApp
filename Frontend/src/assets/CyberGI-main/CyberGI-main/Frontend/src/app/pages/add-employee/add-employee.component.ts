import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import Validation from 'src/app/utils/validation';

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {

  signupForm!: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  employerId:any;
  employeeId:number|null=null;
  usernameVar:string="";

  constructor(private fb: FormBuilder, private authService: AuthService, 
    private router: Router,private route:ActivatedRoute,private helper:HelperService,private spinner: NgxSpinnerService) {}

  ngOnInit(): void {

  
    this.signupForm = this.fb.group(
      {
        username: ['', Validators.required],
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
 
        // Retrieve the id from the route parameters
        this.route.paramMap.subscribe(params => {
          this.employerId = params.get('id');
          // Perform any actions based on the id, such as fetching data
        });
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;
this.usernameVar=username;
      this.authService.register(username, email, password).subscribe({
        next: data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.fetchUserId(this.usernameVar);
        
       

          this.signupForm.reset();
          this.spinner.hide();

        },
        error: err => {
          this.spinner.hide();
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;   
          this.isSuccessful = false; 
        }
      });
    }

  }
  onLogoClick(){
    this.router.navigate([''])
  }
  fetchUserId(username:string){
    this.helper.getUserIdByUsername(username).subscribe((id)=>{this.employeeId=id;console.log(`userId ${id}`);
    this.saveEmployerUser(this.employeeId!,this.employerId);
  },(error)=>{console.error('no fetch');});
  }

  saveEmployerUser(employeeId: number, employerId: number): void {
    this.helper.saveEmployersUsers(employeeId, employerId).subscribe(
      (response) => {
      
        console.log('Employer user saved successfully:', response);
      },
      (error) => {
        this.errorMessage = 'Error saving employer user';
        console.error('Error:', error);
      }
    );
  }

}