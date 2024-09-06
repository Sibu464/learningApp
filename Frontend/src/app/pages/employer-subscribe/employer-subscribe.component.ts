import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { module,Subscription } from 'src/app/interfaces/quiz';
import { HelperService } from 'src/app/services/helper.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-employer-subscribe',
  templateUrl: './employer-subscribe.component.html',
  styleUrls: ['./employer-subscribe.component.scss']
})
export class EmployerSubscribeComponent implements OnInit {
  employerId: any ="";
  totalModules=0;
  myDataList: module[] = [];

  myData:Subscription[]=[];
  moduleS:number[]=[];
  isSubscribed: boolean = false;
  constructor( private route: ActivatedRoute,private quizService:QuizService,private helper: HelperService,private auth:AuthService,private router:Router){
  
  }
  ngOnInit():void {
      // Retrieve the id from the route parameters
      this.route.paramMap.subscribe(params => {
        this.employerId = params.get('id');
        // Perform any actions based on the id, such as fetching data
      });

      this.quizService.getData().subscribe(
        data => {
          this.myDataList = data;
     
          this.totalModules=this.myDataList.length;
        },
        error => {
          console.error('Error fetching data:', error);
        }
     
      );
    this.helper.getSubscribedModules(this.employerId).subscribe(data=>{this.myData=data; this.processData(); },error=>{console.log("error",error);}); 
    
 
    
  }
  processData(){
  
  const moduleIds:number[] = this.myData.map(item => item.module.id);
this.moduleS=moduleIds;
    console.log(moduleIds);

  }
checkSub(id:number){
  if( this.moduleS.includes(id)){
  
return true;
  }else{
    return false;
  }

}
  subscribeToMod(module_id:number){
    window.location.reload();
    const payload = {
      employer_id: this.employerId,
      module_id: module_id
    };
    this.helper.getSubscribedModules(this.employerId).subscribe(data=>{this.myData=data; this.processData(); },error=>{console.log("error",error);});
  if(this.checkSub(module_id)==false){
    this.helper.subscribeModule(payload).subscribe(response=>{console.log("response: ", response)},error=>{console.log("error: ",error)});

  }

    

  }

leave(){
  this.router.navigate(['/signin']); 
  console.log("pass");
}

}
