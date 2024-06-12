import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, takeUntil, tap } from 'rxjs';

import { RegisterRequest } from 'src/core/models/RegisterRequest';
import { AuthenticationRequest } from 'src/core/models/AuthenticationRequest';
import { AuthenticationResponse } from 'src/core/models/AuthentificationResponse';
import { User } from 'src/core/models/User';
import { TokenService } from '../token/token.service';
import { RoleService } from '../role/role.service';
const BASE_URL = "http://127.0.0.1:8080/api/v1/";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private roleService = inject(RoleService);
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
    const url = BASE_URL +'test/users'; // Replace with your backend API URL
    return this.http.get<User[]>(url, { headers });
  }


  loginUser(username: string,refreshToken:string,accessToken:string): boolean {
    this.tokenService.login(username,refreshToken,accessToken);
    return true;
  }

  isLoggedIn(): boolean {
    let token = this.tokenService.getAccessToken();
    if (token == undefined || token == '') {
      return false;
    } else {
      return true;
    }
  }



  logout() {
    this.tokenService.logout();
    this.roleService.logout();
    return true;
  }

  log(message: string): void {
    console.log("User Auth Service " + message);
  }
}
