import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhishingOnboardComponent } from './phishing-onboard.component';

describe('PhishingOnboardComponent', () => {
  let component: PhishingOnboardComponent;
  let fixture: ComponentFixture<PhishingOnboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhishingOnboardComponent]
    });
    fixture = TestBed.createComponent(PhishingOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
