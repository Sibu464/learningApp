import { Component, OnInit } from '@angular/core';
import { QuisService } from 'src/app/services/quis.service';

import { QuizService } from 'src/app/services/quiz.service';
import { ScoreService } from 'src/app/services/score.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  userName: string | null = null;
  questions: any[] = [];
  currIndex: number = 0;
  questionNumber: number = 1;
  earn: number = 0;
  gameOver: boolean = false;
  timeOut: boolean = false;
  timer: number = 30;
  doubleTimeUsed: boolean = false;
  changeUsed: boolean = false;
  showSticker: boolean = false;
  stickerSrc: string = '';
  moneyPyramid: any[] = [
    { id: 1, amount: 100 },
    { id: 2, amount: 200 },
    { id: 3, amount: 300 },
    { id: 4, amount: 500 },
    { id: 5, amount: 1000 },
    { id: 6, amount: 2000 },
    { id: 7, amount: 4000 },
    { id: 8, amount: 8000 },
    { id: 9, amount: 16000 },
    { id: 10, amount: 32000 },
  ].reverse();

  constructor(private quisService: QuisService, private scoreService: ScoreService, private storageService: StorageService) {}

  ngOnInit() {
    this.userName = this.storageService.getUser().username;
    if (!this.userName) {
      // Redirect to start if username is not found
      window.location.href = '/start';
    }
    this.quisService.getQuestions().subscribe(questions => {
      this.questions = questions;
    });
  }

  handleAnswer(answer: string) {
    this.showSticker = true;
    if (answer === this.questions[this.currIndex].correct_answer) {
      this.earn += this.moneyPyramid[10 - this.questionNumber].amount;
      this.stickerSrc = 'assets/images/happy.png';
      this.questionNumber++; // Only increase question number if the answer is correct
    } else {
      this.stickerSrc = 'assets/images/sad.jpg';
    }

    setTimeout(() => {
      this.showSticker = false;
      this.handleNextQuestion();
    }, 5000); // Show sticker for 5 seconds
  }

  handleNextQuestion() {
    if (this.questionNumber === 10) {
      this.gameOver = true;
      this.saveScore();
    }
    this.currIndex++;
  }

  handleTimeOut() {
    this.timeOut = true;
  }

  continueGame() {
    this.timeOut = false;
    if (this.questionNumber === 10) {
      this.gameOver = true;
      this.saveScore();
    } else {
      this.questionNumber++;
      this.currIndex++;
    }
  }

  extendTime() {
    this.timer += 30;
    this.doubleTimeUsed = true;
  }

  changeQuestion() {
    this.changeUsed = true;
    this.handleNextQuestion();
  }

  saveScore() {
    this.scoreService.saveScore(this.earn).subscribe(response => {
      console.log('Score saved:', response);
    });
  }
}
