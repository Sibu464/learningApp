import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  user: any;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.user = this.storageService.getUser();
  }
}
