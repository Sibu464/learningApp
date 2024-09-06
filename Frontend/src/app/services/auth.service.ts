import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

const AUTH_API = `${environment.apiUrl}`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(private http: HttpClient, private router: Router, private storageService: StorageService) {}

  

  private loggedIn = new BehaviorSubject<boolean>(this.storageService.isLoggedIn());
  authState = this.loggedIn.asObservable();



  isLoggedIn() {
    
    if(this.storageService.getUser()){
     const currentUser= this.storageService.getUser().username;
     this.authState = this.loggedIn.asObservable();
      console.log(currentUser)
    }
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'auth/signin',
      { username, password },
      httpOptions
    ).pipe(
      tap(data => {
        if (data) {
          this.storageService.saveUser(data);
          this.loggedIn.next(true); 
          window.location.reload();
        }
      })
    );
   
  }

  register(username: string, email: string, password: string , role?:string[]): Observable<any> {
    const payload: any = { username, email, password };
  
    if (role) {
      payload.role = role;
    }
    return this.http.post(
      AUTH_API + 'auth/signup',
    payload,
      httpOptions
    );
  }




  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'auth/signout', {}, httpOptions).pipe(
      tap(() => {
        this.storageService.clean();
        this.loggedIn.next(false); 
        this.router.navigate(['/signin']); 
      })
    );
  }
}
