import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent {
  @Input() changeUsed!: boolean;
  @Output() changeQuestion = new EventEmitter<void>();

  handleClick() {
    this.changeQuestion.emit();
  }
}
