import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhishingWarsIntroPageComponent } from './phishing-wars-intro-page.component';

describe('PhishingWarsIntroPageComponent', () => {
  let component: PhishingWarsIntroPageComponent;
  let fixture: ComponentFixture<PhishingWarsIntroPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhishingWarsIntroPageComponent]
    });
    fixture = TestBed.createComponent(PhishingWarsIntroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
