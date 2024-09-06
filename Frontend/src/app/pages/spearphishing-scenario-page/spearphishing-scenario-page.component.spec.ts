import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpearphishingScenarioPageComponent } from './spearphishing-scenario-page.component';

describe('SpearphishingScenarioPageComponent', () => {
  let component: SpearphishingScenarioPageComponent;
  let fixture: ComponentFixture<SpearphishingScenarioPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpearphishingScenarioPageComponent]
    });
    fixture = TestBed.createComponent(SpearphishingScenarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
