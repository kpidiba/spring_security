import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import jwtDecode from 'jwt-decode';
const BASE_URL = "http://127.0.0.1:8080/api/v1/";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

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


  user(): Observable<any> {
    const token = this.getToken()!;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // "Authorization": "Bearer "+token,

      // Replace with your actual authorization token
    });
    const url = 'http://localhost:8080/api/v1/test/users'; // Replace with your backend API URL
    return this.http.get<any>(url, { headers })
      .pipe(
        catchError((error: any) => {
          // Handle error if necessary
          console.error('An error occurred:', error);
          throw error;
        })
      );
  }

  getToken() {
    return localStorage.getItem("token");
  }


  loginUser(token: string, username: string): boolean {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    return true;
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem("token");
    if (token == undefined || token == '') {
      return false;
    } else {
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

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    return true;
  }

  log(message: string): void {
    console.log("User Auth Service " + message);
  }
}
