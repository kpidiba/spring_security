import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, takeUntil, tap } from 'rxjs';

import { RegisterRequest } from 'src/core/models/RegisterRequest';
import { AuthenticationRequest } from 'src/core/models/AuthenticationRequest';
import { AuthenticationResponse } from 'src/core/models/AuthentificationResponse';
import { User } from 'src/core/models/User';
import { TokenService } from '../token/token.service';
const BASE_URL = "http://127.0.0.1:8080/api/v1/";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  login(auth: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(BASE_URL + 'auth/login', auth);
  }

  register(data: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(BASE_URL + 'auth/register', data);
  }


  user(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = 'http://localhost:8080/api/v1/test/users'; // Replace with your backend API URL
    return this.http.get<User[]>(url, { headers });
  }


  loginUser(token: string, username: string): boolean {
    this.tokenService.login(token,username);
    return true;
  }

  isLoggedIn(): boolean {
    let token = this.tokenService.getToken();
    if (token == undefined || token == '') {
      return false;
    } else {
      return true;
    }
  }



  logout() {
    this.tokenService.logout();
    return true;
  }

  log(message: string): void {
    console.log("User Auth Service " + message);
  }
}
