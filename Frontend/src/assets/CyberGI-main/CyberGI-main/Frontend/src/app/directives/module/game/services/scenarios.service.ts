import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/app/environments/environment';
import { feedback, Option, Question } from 'src/app/interfaces/quiz';


@Injectable({
  providedIn: 'root'
})
export class ScenariosService {
  private apiUrl = 'http://localhost:8080/api/quiz';

  constructor(private http: HttpClient) { }

  getModules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/modules`);
  }

  getQuestionsByModule(moduleId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/modules/${moduleId}/questions`);
  }

  getOptionsByQuestionId(questionId: number): Observable<Option[]> {
    return this.http.get<Option[]>(`${this.apiUrl}/byquestion/${questionId}`);
  }

  getFeedback(questionID:number):Observable<feedback>{
    return this.http.get<feedback>(`${this.apiUrl}/feedback/${questionID}`);
  }

}
