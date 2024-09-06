import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Question } from 'src/app/interfaces/quiz';

@Component({
  selector: 'app-player-one',
  templateUrl: './player-one.component.html',
})
export class PlayerOneComponent implements OnInit {
  question: Question | null = null;

  constructor(public quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuestion();
  }

  loadQuestion(): void {
    const moduleId = 1; 
    this.quizService.getQuestionsByModule(moduleId).subscribe(
      (questions) => {
        if (questions.length > 0) {
          this.question = questions[0]; // Load the first question for now
        }
      },
      (error) => {
        console.error('Error loading questions:', error);
      }
    );
  }
}
