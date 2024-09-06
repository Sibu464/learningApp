import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleTimeComponent } from './double-time.component';

describe('DoubleTimeComponent', () => {
  let component: DoubleTimeComponent;
  let fixture: ComponentFixture<DoubleTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoubleTimeComponent]
    });
    fixture = TestBed.createComponent(DoubleTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
