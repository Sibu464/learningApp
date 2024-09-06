import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBoardComponent } from './employee-board.component';

describe('EmployeeBoardComponent', () => {
  let component: EmployeeBoardComponent;
  let fixture: ComponentFixture<EmployeeBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeBoardComponent]
    });
    fixture = TestBed.createComponent(EmployeeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
