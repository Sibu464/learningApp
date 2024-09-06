import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesupComponent } from './timesup.component';

describe('TimesupComponent', () => {
  let component: TimesupComponent;
  let fixture: ComponentFixture<TimesupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimesupComponent]
    });
    fixture = TestBed.createComponent(TimesupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
