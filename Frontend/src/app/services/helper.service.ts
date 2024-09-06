import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { employer, Employer, module, Subscription } from '../interfaces/quiz';
import { Emp } from '../interfaces/userInterface';
interface SaveEmployersUsersPayload {
  employee_id: number;
  employer_id: number;
}
@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private static hideToolbar:boolean;
  studied=false;

  constructor(private http: HttpClient, private router: Router, private storageService: StorageService) { }

  //Subscribing to a module or adding a module, action performed by employer with api http://localhost:8080/api/subscribed-modules
  subscribeModule(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      //include cookie a bit later or bearer token in body
      
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(environment.subModuleUrl, payload, { headers });
  }
  getToolbar(){
    return HelperService.hideToolbar;
  }
  setToolbar(status:boolean){
    HelperService.hideToolbar=status;
  }

  getStudy(){
    return this.studied;
  }
  setStudy(x:boolean){
    this.studied=x;
  }


  //getting all subscribed modules with their subscriber ids to check before subscribing if the user has already subscribed
  getSubscribedModules(id:number): Observable<Subscription[]> {
    return this.http.get<any[]>(`${environment.getSubModules}${id}`).pipe(
      map((response: any[]) => {
        return response.map(item => ({
       
          id: item.id,
          module: item.module as module,
          employer: item.employer as Employer
      
        }));
      })
    );
  }


  getData(): Observable<module[]> {
    return this.http.get<any[]>(environment.moduleUrl).pipe(
      map((response: any[]) => {
        return response.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          picture:item.picture_url,
        }));
      })
    );
  }


  // getEmployer(id: number): Observable<Emp[]> {
  //   return this.http.get<any>(`${environment.usersUrl}/employer/${id}`).pipe(
  //     map((response: any) => ({
  //       id: response.id,
  getEmployer(id:number): Observable<any> {
    return this.http.get<any>(`${environment.usersUrl}/employer/${id}`);

  }
  // getEmployer(id: number): Observable<Emp[]> {
  //   return this.http.get<any>(`${environment.usersUrl}/employer/${id}`).pipe(
  //     map((response: any) => ({
  //       id: response.id,
      
       
  //     }))
  //   );
  // }
  //     }))
  //   );
  // }


  getUserIdByUsername(username: string): Observable<number> {
    const params = new HttpParams().set('username', username);
    return this.http.get<number>(`${environment.usersUrl}/getUserId`, { params });
  }

  // saveEmployersUsers(employeeId: number, employerId: number): Observable<any> {
  //   const params = new HttpParams()
  //     .set("employee_id", employeeId)
  //     .set("employer_id", employerId);
  //  // http://localhost:8080/api/employers-users/save?employee_id=21&employer_id=7
  //   return this.http.post<any>(`${environment.usersUrl}/save`,params);
   

    
  // }
  saveEmployersUsers(employeeId: number, employerId: number): Observable<any> {
    const payload: SaveEmployersUsersPayload = {
      employee_id: employeeId,
      employer_id: employerId
    };

    return this.http.post<any>(`${environment.usersUrl}/save`, payload);
  }




}
