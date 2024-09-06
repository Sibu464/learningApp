import { Component, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss'],
  animations: [
    trigger('fadeInFromLeft', [
      state('void', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      transition('void => *', [
        animate('0.9s ease-in-out', style({
          opacity: 1,
          transform: 'translateX(0)'
        }))
      ])
    ]),
    trigger('fadeInFromRight', [
      state('void', style({
        opacity: 0,
        transform: 'translateX(100%)'
      })),
      transition('void => *', [
        animate('0.9s ease-in-out', style({
          opacity: 1,
          transform: 'translateX(0)'
        }))
      ])
    ])
  ]
})

export class IntroPageComponent {
  constructor(private router: Router) {}

  navigateToSignIn() {
    this.router.navigate(['/signin']);
  }

}
