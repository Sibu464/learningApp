import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerSubscribeComponent } from './employer-subscribe.component';

describe('EmployerSubscribeComponent', () => {
  let component: EmployerSubscribeComponent;
  let fixture: ComponentFixture<EmployerSubscribeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerSubscribeComponent]
    });
    fixture = TestBed.createComponent(EmployerSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
