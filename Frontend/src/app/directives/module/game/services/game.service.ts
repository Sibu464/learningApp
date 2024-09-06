import { Injectable } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private questions: Question[] = [
    {
      text: 'What is spear-phishing?',
      options: ['Malware', 'Targeted email attack', 'Social media scam', 'Password hacking tool'],
      correctAnswer: 'Targeted email attack',
    },
    {
      text: 'How is spear-phishing different from phishing?',
      options: ['Targets individuals', 'Always bulk emails', 'No links involved', 'Uses pop-ups'],
      correctAnswer: 'Targets individuals',
    },
    {
      text: 'What is a sign of spear-phishing?',
      options: ['Generic greeting', 'Spelling errors', 'Requests personal info', 'Promises money'],
      correctAnswer: 'Requests personal info',
    },
    {
      text: 'What should you do if an email seems suspicious?',
      options: ['Reply to it', 'Call the sender', 'Click links', 'Forward to friends'],
      correctAnswer: 'Call the sender',
    },
    {
      text: 'Why check the email address in spear-phishing?',
      options: ['To find malware', 'To verify legitimacy', 'To mark as spam', 'To check attachments'],
      correctAnswer: 'To verify legitimacy',
    }
  ];

  private currentQuestionIndex: number = 0;
  private playerOneLife: number = 100;
  private playerTwoLife: number = 100;
  private gameOver: boolean = false;

  constructor(private quizService: QuizService) {}

  getCurrentQuestion(): Question | null {
    if (this.gameOver) {
      return null;
    }
    return this.questions[this.currentQuestionIndex] || null;
  }
  

  checkAnswer(selectedOption: string, isPlayerTwo: boolean): boolean {
    if (this.gameOver) {
      return false;
    }
  
    const currentQuestion = this.getCurrentQuestion();
    if (!currentQuestion) {
      return false;
    }
  
    const isCorrect = currentQuestion.correctAnswer === selectedOption;
  
    if (isCorrect) {
      if (isPlayerTwo) {
        this.playerOneLife -= 20;
      } else {
        this.playerTwoLife -= 20;
      }
    }
  
    if (this.playerOneLife <= 0 || this.playerTwoLife <= 0 || this.currentQuestionIndex >= this.questions.length - 1) {
      this.gameOver = true;
    } else {
      this.moveToNextQuestion();
    }
  
    return isCorrect;
  }
  
  

  moveToNextQuestion() {
    if (!this.gameOver && this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      console.log('Game Over! No more questions.');
    }
  }

  restartGame() {
    this.currentQuestionIndex = 0;
    this.playerOneLife = 100;
    this.playerTwoLife = 100;
    this.gameOver = false;
  }

  getPlayerOneLife(): number {
    return this.playerOneLife;
  }

  getPlayerTwoLife(): number {
    return this.playerTwoLife;
  }

  isGameOver(): boolean {
    return this.gameOver;
  }

  // Method to get the correct option for the current question
  getCorrectOption(): string | null {
    const currentQuestion = this.getCurrentQuestion();
    return currentQuestion?.correctAnswer || null;
  }
  
}
