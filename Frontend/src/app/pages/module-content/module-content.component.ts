import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-module-content',
  templateUrl: './module-content.component.html',
  styleUrls: ['./module-content.component.scss']
})
export class ModuleContentComponent implements OnInit {
  activeButton?: string;
  role:string="";
  currentUser:any;
  studied=false;// checks if the user went through the learning content
  Profile =  sessionStorage.getItem('avatar')?.toString();
  
  constructor(private storageService: StorageService, private router: Router,private auth:AuthService,private helper:HelperService) { }

  ngOnInit(): void {
    if(this.storageService.getUserRole()=="ROLE_EMPLOYEE"){
      this.role="Employee";
    }else{
      this.role="Employer";
    }
    this.currentUser=this.storageService.getUser();
      this.studied=this.helper.getStudy();
  }
 
  
  navigateToChallengesIntro(button: string) {
    this.activeButton = button;
    if(!this.studied){
      Swal.fire({
        icon: 'info',
        title: 'Information',
        text: 'Please  complete the learning content before proceeding.',
        confirmButtonText: 'OK',
        confirmButtonColor:'blue'
     
      
      });
    }else{
    this.router.navigate(['/intro-challenge']);
    }
  }
  navigateToLearn(){
    this.helper.setStudy(true);
    this.router.navigate(['/content']);
  }
   username = localStorage.getItem('nameUser');
  }
