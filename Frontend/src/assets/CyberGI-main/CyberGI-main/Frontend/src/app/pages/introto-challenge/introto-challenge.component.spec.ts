import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrotoChallengeComponent } from './introto-challenge.component';


describe('IntrotoChallengeComponent', () => {
  let component: IntrotoChallengeComponent;
  let fixture: ComponentFixture<IntrotoChallengeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntrotoChallengeComponent]
    });
    fixture = TestBed.createComponent(IntrotoChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
