import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuisService {
  private apiUrl = 'https://opentdb.com/api.php?amount=100';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => data.results.map((question: any) => ({
        ...question,
        answers: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5)
        
      
      })))
    );
  }
}
