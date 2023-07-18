import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { User } from 'src/app/models/User';
import { LoginService } from './login.service';

const BASE_URL = "http://127.0.0.1:8080/api/v1/";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private loginService: LoginService) { }

  login(username: string, password: string): any {
    return this.http.post<[]>(BASE_URL + 'auth/login',
      { username, password },
      { observe: 'response' })
      .pipe(
        tap(_ => this.log("User Authentication")),
        map((res: HttpResponse<any>) => {
          return res;
        })
      )
  }

  // user(): any {
    // const token = this.loginService.getToken()!;
    // const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer ' + token})}
    // return this.http.get(BASE_URL + 'test/users',httpOptions).subscribe(
      //   {
      //     next:(res) =>
      //     {
      //       // console.log(res);
      //       return res;
      //     },
      //     error:(error) =>{
      //       // console.log(error);
      //       return error;
      //     }
      //   }
      // )

    
  // }

  user(): Observable<any> {
    const token = this.loginService.getToken()!;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "Bearer "+token,
      
       // Replace with your actual authorization token
    });
    const url = 'http://localhost:8080/api/v1/test/users'; // Replace with your backend API URL
    return this.http.get<any>(url,{headers})
      .pipe(
        catchError((error: any) => {
          // Handle error if necessary
          console.error('An error occurred:', error);
          throw error;
        })
      );
  }
  log(message: string): void {
    console.log("User Auth Service " + message);
  }
}
