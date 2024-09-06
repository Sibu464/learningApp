import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() questionNumber!: number;
  @Output() timeOut = new EventEmitter<void>();
  timer: number = 30;
  intervalId!: any;

  ngOnInit() {
    this.startTimer();
  }

  ngOnChanges() {
    this.resetTimer();
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.timeOut.emit();
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  resetTimer() {
    clearInterval(this.intervalId);
    this.timer = 30;
    this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
