import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { StorageService } from './storage.service';

const API_URL = `${environment.apiUrl}`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  saveScore(score: number): Observable<any> {
    const user = this.storageService.getUser();
    return this.http.post(
      `${API_URL}/score`,
      { username: user.username, score },
      httpOptions
    );
  }
}
