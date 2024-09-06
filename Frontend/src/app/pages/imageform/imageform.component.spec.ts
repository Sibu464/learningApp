/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImageformComponent } from './imageform.component';

describe('ImageformComponent', () => {
  let component: ImageformComponent;
  let fixture: ComponentFixture<ImageformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
