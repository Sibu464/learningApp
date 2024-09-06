import { Component, HostListener, OnInit } from '@angular/core';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit  {


  isMobile: boolean;

  constructor() {
    this.isMobile = window.innerWidth < 641;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 641;
  }


  








}
