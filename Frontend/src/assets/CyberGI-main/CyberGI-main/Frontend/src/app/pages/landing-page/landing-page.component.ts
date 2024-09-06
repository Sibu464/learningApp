import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
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
export class LandingPageComponent {
  constructor(private router: Router) {}

  navigateToIntro() {
    this.router.navigate(['/intro-page']);
  }
}

