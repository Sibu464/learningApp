

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';





const API_URL = `${environment.apiUrl}`;
@Injectable(
  {providedIn: "root"}
)


export class UploadService {
  private uploadUrl = API_URL+'images/upload';
 //private imageURL = API_URL+'images/upload








  constructor(private http: HttpClient) { }

  private getToken(): string {
    return sessionStorage.getItem('auth-user') || '';
  }




  uploadImage(name: string, file: File, userId: number): Observable<any> {

    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('file', file, file.name);
    formData.append('userId', userId.toString());
// try fetch token manually
    const token = this.getToken();

    const httpOptions = ({
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json' ,
       'Authorization': `Bearer ${token}`
    }),

     withCredentials: true
    })

    return this.http.post(this.uploadUrl, formData, httpOptions);
  }

  loadProfile() {

    
  }
}
