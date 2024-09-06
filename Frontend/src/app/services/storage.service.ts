import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const USER_NAME_KEY = 'nameUser';
const TOKEN_KEY = '';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  getUserRole(){
    let response = window.sessionStorage.getItem(USER_KEY);
    if(response){
      let parsedResponse = JSON.parse(response);
      return parsedResponse.roles[0];
    }
    return null;
  }

  public getToken(): any {
    interface UserInfo {
      id: number;
      username: string;
      email: string;
      roles: string[];
      token: string;
    }
  
    const userInfo: UserInfo = JSON.parse(window.sessionStorage.getItem('auth-user')!);
    console.log(userInfo.roles)
    const token: string = userInfo.token;
    return token;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

  // New method to get the username from localStorage
  public getUsernameFromLocalStorage(): string | null {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.nameUser || null; // Adjust the key based on your stored data structure
    }
    return null;
  }
  public saveUserImage(imageUrl:any){
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(imageUrl));
    console.log("Image saved with"+ imageUrl)
  }

  public getUserImage() {
  let avatar = window.sessionStorage.getItem(USER_KEY)
  if(avatar){
    let parsedResponse=JSON.parse(avatar);
    return parsedResponse.imageUrl;
  }
  }


  public getUserName(): string | null {
    return window.localStorage.getItem(USER_NAME_KEY);
  }

  public getEmployerId(): number | null {
    const user = this.getUser();
    if (user && user.id) {
      return user.id;
    }
    return null;
  }
}
