import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { extend } from 'hammerjs';
import { QuisService } from 'src/app/services/quis.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss']
})

// export class ResultsPageComponent {
//   activeButton: string | undefined;
//   router: any;
//   Profile =  sessionStorage.getItem('avatar')?.toString();


export class ResultsPageComponent implements OnInit {
  score=0;
  Profile =  sessionStorage.getItem('avatar')?.toString();
  username:string | undefined;
  moduleId:number | undefined;
  constructor(private quizService: QuizService,private route:ActivatedRoute,private router: Router){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const username = params['username'];
      const moduleId = params['moduleId'];
     this.username=username;
     this.moduleId=moduleId;
    });
    if(typeof QuizService.userScore==='undefined'){
      this.score=0;
    }else{
      this.score=QuizService.userScore;
    }

//get score
console.log("the score: ",QuizService.userScore);

  }



gotoHome(){
  this.router.navigate(['/home-page']);
}
retryQ(){
  this.quizService.resetUserProgress(this.username!,this.moduleId!).subscribe((data)=>{});
  this.router.navigate(['/module101']);
}
}
