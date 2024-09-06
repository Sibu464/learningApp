import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

// Components
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { IntrotoChangellenge } from './pages/introto-challenge/introto-challenge.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ResultsPageComponent } from './pages/results-page/results-page.component';
import { ModuleContentComponent } from './pages/module-content/module-content.component';
import { EmployeeBoardComponent } from './pages/employee-board/employee-board.component';
import { EmployerBoardComponent } from './pages/employer-board/employer-board.component';
import { AdminBoardComponent } from './pages/admin-board/admin-board.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { ActiveEmployeesComponent } from './pages/active-employees/active-employees.component';
import { EmployerSubscribeComponent } from './pages/employer-subscribe/employer-subscribe.component';
import { ImageformComponent } from './pages/imageform/imageform.component';
import { EmployeeProfileComponent } from './pages/employee-profile/employee-profile.component';
import { FilterPipe } from './pipes/filter.pipe';
import { HighlightDirective } from './directives/highlith.directive';

// Services
import { AuthService } from './services/auth.service';
import { PhishingOnboardComponent } from './pages/phishing-onboard/phishing-onboard.component';
import { GameBoardComponent } from './directives/module/game/game-board.component';
import { PlayerOneComponent } from './directives/module/game/player-one/player-one.component';
import { PlayerTwoComponent } from './directives/module/game/player-two/player-two.component';
import { GameModule } from './directives/module/game/game.module';
import { FlashcardComponent } from './pages/flashcard/flashcard.component';
import { ContentPageComponent } from './pages/content-page/content-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    ToolbarComponent,
    IndexPageComponent,
    IntrotoChangellenge,
    QuizComponent,
    ResultsPageComponent,
    ModuleContentComponent,
    EmployeeBoardComponent,
    EmployerBoardComponent,
    AdminBoardComponent,
    AddEmployeeComponent,
    ActiveEmployeesComponent,
    EmployerSubscribeComponent,
    ImageformComponent,
    FilterPipe,
    EmployeeProfileComponent,
    SignupComponent,
    SigninComponent,
    HighlightDirective,
    PhishingOnboardComponent,
    GameBoardComponent,
    PlayerOneComponent,
    PlayerTwoComponent,
    FlashcardComponent,
    ContentPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    CommonModule,
    GameModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
