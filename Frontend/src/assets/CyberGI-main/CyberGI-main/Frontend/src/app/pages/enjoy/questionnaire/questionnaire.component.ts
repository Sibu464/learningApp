import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent {
  @Input() question: any;
  @Output() answerSelected = new EventEmitter<string>();
  selectedAnswer: string | null = null;
  className: string = 'answer';

  constructor(private audioService: AudioService) {}

  handleClick(answer: string) {
    this.selectedAnswer = answer;
    this.className = 'answer active';
    setTimeout(() => {
      this.className = answer === this.question.correct_answer ? 'answer correct' : 'answer wrong';
      if (answer === this.question.correct_answer) {
        this.audioService.play('correct');
      } else {
        this.audioService.play('wrong');
      }
    }, 1000);
    setTimeout(() => {
      this.answerSelected.emit(answer);
      this.selectedAnswer = null;
    }, 2000);
  }
}
