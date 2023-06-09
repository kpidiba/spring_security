import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { User } from 'src/app/models/User';

const BASE_URL = "http://127.0.0.1:8080/api/v1/auth/";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  // login(username:string,  password:string):any{

  //   return this.http.post<[]>(BASE_URL+"login",+{username,password},{observe:'response'})
  //   .pipe(
  //     tap( _ => this.log("User Authentification")),
  //     map((res: HttpResponse<any>)=>{
  //       console.log(res);
  //       return res;
  //     })
  //   );
  // }
  login(username: string, password: string): any {
    console.log(username, password)
    return this.http.post<[]>(BASE_URL + 'login',
      { username, password },
      { observe: 'response' })
      .pipe(
        tap(_ => this.log("User Authentication")),
        map((res: HttpResponse<any>) => {
          console.log(res.status);
          return res;
        })
      )
  }
  log(message: string):void {
    console.log("User Auth Service "+message);
  }
  

}
