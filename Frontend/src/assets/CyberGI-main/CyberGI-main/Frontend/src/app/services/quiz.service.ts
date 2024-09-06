import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CorrectAnswer, feedback, Feedback, module, Option, Progress, Question, UserAnswer,  } from '../interfaces/quiz';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class QuizService {
static userScore:number;
setScore(x:number):void{QuizService.userScore=x;}
getScore ():number{return QuizService.userScore;}

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8080/api/quiz';

  
  getFeedback(questionID:number):Observable<feedback>{
    return this.http.get<feedback>(`${this.apiUrl}/feedback/${questionID}`);
  }

  getQuestionsByModule(moduleId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/modules/${moduleId}/questions`);
  }

  getOptionsByQuestionId(questionId: number): Observable<Option[]> {
    return this.http.get<Option[]>(`${this.apiUrl}/byquestion/${questionId}`);
  }

  getUserProgress(username: string, moduleId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user-progress/${username}/${moduleId}`);
  }

  updateUserProgress(username: string, moduleId: number, currentQuestionIndex: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/user-progress/${username}/${moduleId}/${currentQuestionIndex}`, {});
  }

  submitAnswer(questionId: number, optionId: number): Observable<void> {
    const payload = { questionId, optionId };
    return this.http.post<void>(`${this.apiUrl}/questions/${questionId}/submit-answer`, payload);
  }

  recordUserAnswer(username: string, questionId: number, optionId: number, moduleId: number, correct: boolean): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/user-answer/${username}/${questionId}/${optionId}/${moduleId}/${correct}`, {});
  }

  getUserAnswers(username: string): Observable<UserAnswer[]> {
    return this.http.get<UserAnswer[]>(`${this.apiUrl}/user-answers/${username}`);
  }

  calculateScore(username: string, moduleId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/calculate-score/${username}/${moduleId}`);
  }

  

  resetUserProgress(username: string, moduleId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reset-progress/${username}/${moduleId}`, {});
  }

  resetQuizState(): void {
    QuizService.userScore = 0;
  }















































  //////////////////adding modules get data//////////////////////////////////
  getData(): Observable<module[]> {
    return this.http.get<any[]>(environment.moduleUrl).pipe(
      map((response: any[]) => {
        return response.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          picture:item.pictureUrl,
        }));
      })
    );
  }
  /////////////////////////////////////////////////////////////////////////////
}
