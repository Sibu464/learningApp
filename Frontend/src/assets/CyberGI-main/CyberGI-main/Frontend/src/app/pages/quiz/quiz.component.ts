import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { feedback, Option, Question, UserAnswer } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { StorageService } from 'src/app/services/storage.service';
import { AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Howl, Howler } from 'howler';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  correctSound = new Howl({
    src: ['assets/correct-choice-43861.mp3']
  });

  incorrectSound = new Howl({
    src: ['assets/buzzer-or-wrong-answer-20582.mp3']
  });
  
  userId: number | undefined; // To hold the user ID
  questions: Question[] = [];
  options: Option[] = [];
  feedback: feedback | undefined;
  currentQuestionIndex = 0;
  userAnswers: UserAnswer[] = [];
  moduleId: number = 1; // Example module ID, set as required
  username: string = ""; // Replace with actual username
  isQuizCompleted: boolean = false; // Track if the quiz is completed
  showFeedback = false;
  showNextButton = false; // Track visibility of the Next button
  startIndex = 0;
  score: number | undefined;
  leftOff: number = 0;
  buttonColor = '#0353a4';
  textColor = 'white';

  @ViewChildren('myButtons') buttons!: QueryList<ElementRef>;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!; // Get the user ID from the URL
    });
    this.username = this.storageService.getUser().username;
    this.loadStartIndex();
    this.loadQuestions();
  }

  submitAnswer(chosenOption: Option, questionId: number, index: number) {
    const button = this.buttons.toArray()[index].nativeElement;
    const question = this.questions[this.currentQuestionIndex];
    const isCorrect = chosenOption.correct;
    this.disableAllButtons();

    if (!isCorrect) {
      
      this.playSound(false);
      this.loadFeedback(questionId);
      button.style.backgroundColor = 'red';
      this.showFeedback = true;
    } else {
      this.playSound(true);
      button.style.backgroundColor = 'green';
      this.showFeedback = false; // Ensure feedback is hidden immediately for correct answers
    }

    // Show the Next button after an option is selected
    this.showNextButton = true;

    // Record the user answer
    this.quizService.recordUserAnswer(this.username, question.id, chosenOption.id, this.moduleId, isCorrect).subscribe(() => {
      this.quizService.updateUserProgress(this.username, this.moduleId, this.currentQuestionIndex + 1).subscribe((data) => {
        console.log("Progress updated for question index:", this.currentQuestionIndex);
      });
    });
  }

  nextQuestion() {
    // Move to the next question
    this.currentQuestionIndex++;
    this.showFeedback=false;
    this.enableAllButtons();

    // Hide the Next button when moving to the next question
    this.showNextButton = false;

    // Check if the quiz is completed
    if (this.currentQuestionIndex >= this.questions.length) {
      this.isQuizCompleted = true;
      this.quizService.calculateScore(this.username, this.moduleId).subscribe((data) => {
        this.score = data;
        this.quizService.setScore(this.score);
      });
    } else {
      // Load options for the next question
      const nextQuestionId = this.questions[this.currentQuestionIndex].id;
      this.loadOptions(nextQuestionId);
      this.showFeedback = false; // Hide feedback when moving to the next question
    }
  }

  gotoResults() {
    this.router.navigate(['/results101'], { queryParams: { username: this.username, moduleId: this.moduleId } });
  }

  resetProg() {
    this.quizService.resetUserProgress(this.username, this.moduleId).subscribe((data) => {
      window.location.reload();
    });
  }

  loadQuestions() {
    this.quizService.getQuestionsByModule(this.moduleId).subscribe((data) => {
      this.questions = data;

      if (this.questions.length > 0) {
        const firstQuestionId = this.questions[this.currentQuestionIndex].id;
        this.loadOptions(firstQuestionId); // Load options for the first question after questions are loaded
      }
    });
  }

  loadOptions(questionId: number) {
    this.quizService.getOptionsByQuestionId(questionId).subscribe((data) => {
      this.options = data.sort(() => Math.random() - 0.5);
      console.log("Options", this.options);
    });
  }

  loadFeedback(questionId: number) {
    this.quizService.getFeedback(questionId).subscribe((data) => {
      this.feedback = data;
      console.log("Feedback", this.feedback);
    });
  }

  loadStartIndex() {
    this.quizService.getUserProgress(this.username, this.moduleId).subscribe((data) => {
      if (data > 0) {
        this.currentQuestionIndex = data; // Ensures the user does not answer a question they already answered
      }
      this.leftOff = data;
    });
  }

  get progress() {
    return (this.currentQuestionIndex / this.questions.length) * 100;
  }

  playSound(isCorrect: boolean) {
    if (isCorrect) {
      this.correctSound.play();
    } else {
      this.incorrectSound.play();
    }
  }

  disableAllButtons() {
    this.buttons.forEach(button => {
      const nativeButton = button.nativeElement as HTMLButtonElement;
      nativeButton.disabled = true; // Disable the button
      nativeButton.style.pointerEvents = 'none'; // Ensure it doesn't receive pointer events
      nativeButton.style.opacity = '0.89'; // Optionally, visually indicate that it's disabled
    });
  }

  enableAllButtons() {
    this.buttons.forEach(button => {
      const nativeButton = button.nativeElement as HTMLButtonElement;
      nativeButton.disabled = false; // Enable the button
      nativeButton.style.pointerEvents = 'auto'; // Allow pointer events
      nativeButton.style.opacity = '1'; // Reset the opacity
    });
  }
}
