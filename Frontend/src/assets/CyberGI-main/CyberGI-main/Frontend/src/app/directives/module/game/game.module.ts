import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { GameRoutingModule } from './game-routing.module';
import { GameBoardComponent } from './game-board.component';
import { ScenariosService } from './services/scenarios.service';

@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    GameRoutingModule
  ],
  providers: [ScenariosService]
})
export class GameModule { }
