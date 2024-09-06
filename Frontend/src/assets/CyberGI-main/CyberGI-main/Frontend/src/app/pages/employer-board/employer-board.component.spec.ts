import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerBoardComponent } from './employer-board.component';

describe('EmployerBoardComponent', () => {
  let component: EmployerBoardComponent;
  let fixture: ComponentFixture<EmployerBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerBoardComponent]
    });
    fixture = TestBed.createComponent(EmployerBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
