import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroPageComponent } from './pages/intro-page/intro-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { IntrotoChangellenge } from './pages/introto-challenge/introto-challenge.component';
import { ModuleContentComponent } from './pages/module-content/module-content.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ResultsPageComponent } from './pages/results-page/results-page.component';
import { EmployerBoardComponent } from './pages/employer-board/employer-board.component';
import { EmployeeBoardComponent } from './pages/employee-board/employee-board.component';
import { AdminBoardComponent } from './pages/admin-board/admin-board.component';
import { AuthGuard } from './guards/guard.guard';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { EmployeeProfileComponent } from './pages/employee-profile/employee-profile.component';
import { PhishingWarsIntroPageComponent } from './pages/phishing-wars-intro-page/phishing-wars-intro-page.component';
import { SpearphishingScenarioPageComponent } from './pages/spearphishing-scenario-page/spearphishing-scenario-page.component';
import { PhishingOnboardComponent } from './pages/phishing-onboard/phishing-onboard.component';
import { StartComponent } from './pages/enjoy/start/start.component';
import { GameComponent } from './pages/enjoy/game/game.component';
import { EmployerSubscribeComponent } from './pages/employer-subscribe/employer-subscribe.component';
import { ActiveEmployeesComponent } from './pages/active-employees/active-employees.component';
import { ImageformComponent } from './pages/imageform/imageform.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GameBoardComponent } from './directives/module/game/game-board.component';
import { ContentPageComponent } from './pages/content-page/content-page.component';


const routes: Routes = [
  {path:"landing-page",component:LandingPageComponent},
  {path:'signup', component:SignupComponent},
  {path:'signin', component:SigninComponent},
  {path:"intro-page",component:IntroPageComponent},
  {path:"index",component:IndexPageComponent,canActivate: [AuthGuard] },
  {path:"home-page",component:HomePageComponent, canActivate: [AuthGuard],},
  {path:"module101",component:ModuleContentComponent, canActivate: [AuthGuard]},
  {path:"intro-challenge",component:IntrotoChangellenge, canActivate: [AuthGuard]},
  {path:"quiz/:id",component:QuizComponent, canActivate: [AuthGuard]},
  {path:"results101",component:ResultsPageComponent, canActivate: [AuthGuard] },
  {path: "employee", component:EmployeeBoardComponent, canActivate: [AuthGuard] },
  {path: "employer", component: EmployerBoardComponent, canActivate: [AuthGuard] },
  {path:"admin", component:AdminBoardComponent, canActivate: [AuthGuard] },
  {path:"",redirectTo:"landing-page",pathMatch:"full"},
  {path:"profile",component:EmployeeProfileComponent},
  {path:"phishing-page",component:PhishingWarsIntroPageComponent},
  {path:"phishing-scenario-page",component:SpearphishingScenarioPageComponent},
  {path:"phishing-onboard", component:PhishingOnboardComponent},
  { path: 'game', component: GameBoardComponent, canActivate: [AuthGuard] },
  { path: 'start', component: StartComponent, canActivate: [AuthGuard] },
  // { path: 'game', component: GameComponent, canActivate: [AuthGuard]},
  {path: 'employer-subscribe/:id', component: EmployerSubscribeComponent, canActivate: [AuthGuard] },
  {path: "addEmployee/:id",component:AddEmployeeComponent,canActivate: [AuthGuard] },
  { path: "active/:id", component:ActiveEmployeesComponent, canActivate:[AuthGuard]},
  { path: "imageform", component:ImageformComponent, canActivate:[AuthGuard]},
  { path: "gallery", component:GalleryComponent, canActivate:[AuthGuard]},
  { path: "content", component:ContentPageComponent, canActivate:[AuthGuard]},



 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
