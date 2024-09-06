import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { Option, Question } from 'src/app/interfaces/quiz';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-player-two',
  templateUrl: './player-two.component.html',
  styleUrls: ['./player-two.component.scss'],
})
export class PlayerTwoComponent implements OnInit {
  selectedOption: Option | null = null;
  showModal: boolean = false;
  playerScore: number = 0;
  totalQuestions: number = 0;
  percentageScore: number = 0; 
  isCorrectAnswer: boolean | null = null;
  question: Question | null = null;
  options: Option[] = [];
  questions: Question[] = []; 
  currentQuestionIndex: number = 0;

  constructor(
    public quizService: QuizService,
    private router: Router,
    private storageService: StorageService
  ) {}
  ngOnInit() {
    this.resetGameState();  
    this.loadQuestions();
    console.log(this.storageService.getToken());
  }

  loadQuestions(): void {
    const moduleId = 1; 
    this.quizService.getQuestionsByModule(moduleId).subscribe(
      (questions) => {
        if (questions.length > 0) {
          this.questions = questions; 
          this.totalQuestions = questions.length; 
          this.loadQuestion(); 
        }
      },
      (error) => {
        console.error('Error loading questions:', error);
      }
    );
  }

  loadQuestion(): void {
    this.question = this.questions[this.currentQuestionIndex]; 
    this.loadOptions(this.question.id);
  }

  selectAnswer(option: Option) {
    if (this.question) {
      this.selectedOption = option;
      this.isCorrectAnswer = option.correct; 

      if (this.isCorrectAnswer) {
        this.playerScore++;
        this.saveScore(); 
      }
      
      this.moveToNextQuestion();
    }
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) { 
      this.calculatePercentage(); 
      this.showModal = true; 
    } else {
      this.loadQuestion(); 
    }
  }

  loadOptions(questionId: number) {
    this.quizService.getOptionsByQuestionId(questionId).subscribe((data) => {
      this.options = data.sort(() => Math.random() - 0.5);
      console.log("Options loaded:", this.options); 
    });
  }

  saveScore() {
    this.quizService.setScore(this.playerScore); 
  }

  calculatePercentage() {
    this.percentageScore = (this.playerScore / this.totalQuestions) * 100;
    console.log(`Final Score: ${this.percentageScore}%`);
  }

  restartGame() {
    this.resetGameState();
    this.loadQuestion();
  }

  goHome() {
    this.router.navigate(['/home-page']);
  }

  resetGameState() {
    this.quizService.resetQuizState(); 
    this.playerScore = 0;
    this.percentageScore = 0;
    this.showModal = false;
    this.isCorrectAnswer = null;
    this.selectedOption = null;
    this.currentQuestionIndex = 0;
  }

  get isGameOver() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}
