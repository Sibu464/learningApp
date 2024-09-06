import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileDetails } from '../models/FileDetails';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  private uploadUrl = 'http://localhost:8080/api/v1/images/upload'; // Your endpoint for uploading
  private getImageByNameUrl = 'http://localhost:8080/api/v1/images/name'; // Your endpoint for getting image by name
  private updateImageUrl = 'http://localhost:8080/api/v1/images'; // Your endpoint for updating image

  constructor(private http: HttpClient) { }

  // Upload an image
  uploadImage(name: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    const userId: any = localStorage.getItem('auth-user.id');  // Retrieve userId from local storage
    //const userId: any =6;
  formData.append('name', name);
  formData.append('userId', userId);
    const params = new HttpParams().set('name', name);
console.log("With user Id" + userId);
    return this.http.post(this.uploadUrl, formData, { params },)
    console.log("With user Id" + userId);

  }

  // Get image by name
  getImageByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.getImageByNameUrl}/${name}`);
  }

  // Update an image
  updateImage(id: any, name: string, url: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = {
      name: name,
      url: url
    };

    return this.http.put(`${this.updateImageUrl}/${id}`, body, { headers });
  }


  // http://localhost:8080/api/v1/images/name/String


  upload(file: File): Observable<FileDetails> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<FileDetails>(`${this.uploadUrl}`, formData, { headers});
  }
}
