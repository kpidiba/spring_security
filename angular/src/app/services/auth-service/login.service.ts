import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class  LoginService {
  constructor() { }

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
