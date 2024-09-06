import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timesup',
  templateUrl: './timesup.component.html',
  styleUrls: ['./timesup.component.scss']
})
export class TimesupComponent {
  @Input() userName!: string;
  @Input() questionNumber!: number;
  @Output() continueGame = new EventEmitter<void>();

  handleClick() {
    this.continueGame.emit();
  }
}
