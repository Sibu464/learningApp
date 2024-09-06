import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { QuizService } from 'src/app/services/quiz.service';
import { HelperService } from 'src/app/services/helper.service';
import { Emp } from 'src/app/interfaces/userInterface';

import { Question } from 'src/app/interfaces/quiz';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page1.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  currentUser: any;
  role: any;
  allModules: any[] = []; // Stores all modules
  myModules: any[] = []; // Stores modules that I'm subscribed to
  userId: any;
  myEmployer: Emp | undefined;
  Profile =  sessionStorage.getItem('avatar')?.toString();
  activeButton: string="";
  username: any;
  moduleId: number=1;
  questions: Question[] = [];
  progValue=0;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private quizService: QuizService,
    private helper: HelperService) { }

  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    this.currentUser = this.storageService.getUser();
    this.loadStartIndex();
    this.loadQuestions();
    console.log("progress of user: ",this.progValue);
    this.role = this.storageService.getUserRole();


    this.quizService.getData().subscribe(
      (data) => {
        this.allModules = data;
        console.log(this.allModules);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );


    if (this.storageService.getUserRole() == 'ROLE_EMPLOYER') {
      this.userId = this.storageService.getUser().id;
      this.helper.getSubscribedModules(this.userId).subscribe(
        (data) => {
          this.myModules = data;
        },
        (error) => {
          console.log('error', error);
        }
      );
    } else {
      this.helper.getEmployer(this.storageService.getUser().id).subscribe(
        (data: any) => {
          let userIDstring= JSON.parse(JSON.stringify(data))[0].id;

          this.helper.getSubscribedModules(userIDstring).subscribe(
            (data) => {
              this.myModules = data;
            },
            (error) => {
              console.log('error', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching user data', error);
        }
      );
    }
  }

  navigateToModule(moduleId: number) {
    this.router.navigate(['/module', moduleId]);
  }

  navigateToAbout(button: string) {
    console.log(button);
    this.activeButton = button;
    this.router.navigate(['/index']);
  }

  navigateToNextPage(button: string) {
    let nextPage: string = '';
    if (button == 'Cyber101') {
      nextPage = 'module101';
    } else if (button == 'Spear Phishing') {
      nextPage = 'phishing-page';
    }
    this.activeButton = button;
    this.router.navigate([`/${nextPage}`]);
  }

  navigateToPhishingWars(button: string) {
    this.activeButton = button;
    this.router.navigate(['/phishing-page']);
  }
  loadStartIndex() {
    this.quizService.getUserProgress(this.username, this.moduleId).subscribe((data) => { this.progValue=data; });
  }
  loadQuestions() {
    this.quizService.getQuestionsByModule(this.moduleId).subscribe((data) => {
      this.questions = data; 
    });

  }

  progBar: string = '';

  Picture1: string = 'https://i.ytimg.com/vi/OSorBPde0JA/maxresdefault.jpg';
  Picture2: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD5njRLxTpvNaU2sDLeUTGZMDq580_ttW3jykUHfVKKfSAgFnNaNAh5FeKX5MWTODdXP4&usqp=CAU';
  Picture3: string =
    'https://www.bankrate.com/2020/04/01172114/Untitled-81.jpeg';
  Picture4: string =
    'https://media.licdn.com/dms/image/D4E12AQGFuQa86rN-Lg/article-cover_image-shrink_720_1280/0/1712845757087?e=2147483647&v=beta&t=fd80yIDEofpupoEnlGYM-RqznByahwswGE1CEaTScRY';
}



function gotoIndexPage() {
  throw new Error('Function not implemented.');
}
