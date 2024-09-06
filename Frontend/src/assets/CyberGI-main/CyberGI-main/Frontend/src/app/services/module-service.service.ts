import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompletedModule } from '../models/completedmodule.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

//  Module service to interact with backend 
export class ModuleServiceService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCompletedModule(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/completed/${userId}`);
  }

  

  getCompletedModules(): Observable<CompletedModule[]> {
    return this.http.get<CompletedModule[]>(`${this.baseUrl}/subscribed-modules/completed-modules`);
  }
}
