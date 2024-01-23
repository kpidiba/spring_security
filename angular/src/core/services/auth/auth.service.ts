import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, takeUntil, tap } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { RegisterRequest } from 'src/core/models/RegisterRequest';
import { AuthenticationRequest } from 'src/core/models/AuthenticationRequest';
import { DestroyService } from '../destroy/destroy.service';
import { AuthenticationResponse } from 'src/core/models/AuthentificationResponse';
import { User } from 'src/core/models/User';
const BASE_URL = "http://127.0.0.1:8080/api/v1/";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

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
