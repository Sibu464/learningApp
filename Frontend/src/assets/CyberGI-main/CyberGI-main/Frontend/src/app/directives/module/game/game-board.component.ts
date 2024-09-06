import { Component, OnInit } from '@angular/core';
import { ScenariosService } from './services/scenarios.service';
import { StorageService } from 'src/app/services/storage.service';import { HelperService } from 'src/app/services/helper.service';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { feedback, Option } from 'src/app/interfaces/quiz';


@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  modules: any[] = [];  // Use any[] instead of ModDTO[]
  errorMessage: string | null = null;
  moduleId = 3;
  questionId = 2;
  options: Option[] = [];
  feedback:feedback | undefined;

  questions: any[] = [];
  currentQuestionIndex = 0;
 
  constructor(private scenarioService: ScenariosService) {}

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions(){

    this.scenarioService.getQuestionsByModule(this.moduleId).subscribe(
        (data)=>{
          this.questions = data
          
          if (this.questions.length > 0) {
            const firstQuestionId = this.questions[this.currentQuestionIndex].id;
            this.loadOptions(firstQuestionId);  
            this.loadFeedback(firstQuestionId);
      
          }
         
        }
    );
  }

  
  loadOptions(questionId: number) {
    this.scenarioService.getOptionsByQuestionId(questionId).subscribe((data) => {
      this.options = data.sort(() => Math.random() - 0.5);
      console.log("options",this.options);
    });
  }
  loadFeedback(questionId:number){
    this.scenarioService.getFeedback(questionId).subscribe((data)=>{
      this.feedback = data;
    });
    
  }

}