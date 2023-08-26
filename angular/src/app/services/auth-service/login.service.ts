import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
const BASE_URL = "http://127.0.0.1:8080/api/v1/"; 
@Injectable({
  providedIn: 'root'
})
export class  LoginService {
  constructor(private http: HttpClient) { }

  getToken()
  {
    return localStorage.getItem("token");
  }


  loginUser(token:string,username:string):boolean
  {
    localStorage.setItem("token",token);
    localStorage.setItem("username",username);
    return true;
  }

  isLoggedIn():boolean
  {
    let token = localStorage.getItem("token");
    if(token == undefined || token ==''){
      return false;
    }else{
      return true;
    }
  }

  getTokenExpiration(): Date | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken && decodedToken.exp) {
          // The "exp" claim contains the expiration time in seconds
          const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
          return new Date(expirationTime);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return null;
  }

  logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    return true;
  }

  log(message: string):void {
    console.log("User Auth Service "+message);
  }
}
