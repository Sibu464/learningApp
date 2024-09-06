import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';




const AUTH_API = `${environment.apiUrl}`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private apiUrl = 'http://localhost:8080/api/v1/empusers/all';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}`,  httpOptions);
  }
  searchEmployeesById(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/search/id/${id}`, httpOptions);
  }
  searchEmployeesByName(name: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/search/name/${name}`, httpOptions);
  }

  softDeleteEmployee(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/soft-delete`, {}, httpOptions);
  }
  
}
