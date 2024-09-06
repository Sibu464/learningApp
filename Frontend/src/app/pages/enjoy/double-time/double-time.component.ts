import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-double-time',
  templateUrl: './double-time.component.html',
  styleUrls: ['./double-time.component.scss']
})
export class DoubleTimeComponent {
  @Input() doubleTimeUsed!: boolean;
  @Input() timer!: number;
  @Output() extendTime = new EventEmitter<void>();

  handleClick() {
    this.extendTime.emit();
  }
}
