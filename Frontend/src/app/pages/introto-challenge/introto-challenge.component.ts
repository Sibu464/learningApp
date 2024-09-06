import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-intro-page',
  templateUrl: './introto-challenge.component.html',
  styleUrls: ['./introto-challenge.component.scss'],
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

export class IntrotoChangellenge implements OnInit{
  userId:any
  image = 'assets/images/cyber pic.png'
  constructor(private router: Router,private storageService:StorageService) {}
  ngOnInit(): void {
this.userId=this.storageService.getUser().id;


  }

  navigateToQ() {
    this.router.navigate([`/quiz/${this.userId}`]);  
  }

  




}


