import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';
import { employer, module, Subscription } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss'],
  animations: [
    trigger('jiggle', [
      transition(':enter', [
        animate('0s', style({ transform: 'rotate(0)' })), // No-op to delay
        animate('0s', style({ transform: 'rotate(-3deg)' })), // Delayed start
        animate('0.4s', style({ transform: 'rotate(3deg)' })),
        animate('0.4s', style({ transform: 'rotate(-3deg)' }))
      ])
    ]),
  ]
 

  
})
export class IndexPageComponent {
  //myDataList: module[] = [];
  myModules:Subscription[]=[];
  userId:any;
  myEmployer:employer|undefined;

  constructor(private router: Router,private quizService:QuizService,private helper: HelperService,private storageService: StorageService) {}

  ngOnInit() {

    if(this.storageService.getUserRole()=="ROLE_EMPLOYER"){
      this.userId=this.storageService.getUser().id;
      this.helper.getSubscribedModules(this.userId).subscribe(data=>{this.myModules=data; console.log(data) },error=>{console.log("error",error);}); 
    
    }else{

     //this.helper.getEmployer(this.storageService.getUser().id).subscribe(data=>{this.myEmployer=data },error=>{console.log("error employer");});
     this.helper.getEmployer(this.storageService.getUser().id).subscribe(
      (data: any) => {
        let userIDstring= JSON.parse(JSON.stringify(data))[0].id;
       
        this.helper.getSubscribedModules(userIDstring).subscribe(
          (data) => {
            this.myModules = data;

          },
          (error) => {
            console.log('error', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );

    }
    

    // this.quizService.getData().subscribe(
    //   data => {
    //     this.myDataList = data;
    //   },
    //   error => {
    //     console.error('Error fetching data:', error);
    //   }
    // );

    
    
  
    

  }

  navigateToNextPage(id:string,name:string) {
    let routerString:String;
   if(name=="Cyber101"){
    routerString="module101";
   }else if(name=="Spear Phishing"){
    routerString="phishing-page";
   }
    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
    audioPlayer.play();

    setTimeout(() => {
      this.router.navigate([`/${routerString}`]);
    }, 250);
    //this will route to the next page and pass the id of the button that was clicked
    //the delay is for the audio to have enough time to play

  }


}
