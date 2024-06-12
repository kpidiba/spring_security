import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { tap } from 'rxjs';
const BASE_URL = "http://127.0.0.1:8080/api/v1/auth";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private http = inject(HttpClient);
  private refreshToken = "refreshToken";
  private accessToken = "accessToken";
  private username = "username";

  getAccessToken() {
    return localStorage.getItem(this.accessToken);
  }

  getRefreshToken(){
    return localStorage.getItem(this.refreshToken);
  }

  getUsername(){
    return localStorage.getItem(this.username);
  }

  getTokenExpiration(): Date | null {
    const token = this.getAccessToken();
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

  login(username: string,refreshToken:string,accessToken:string) {
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("username", username);
  }

  logout() {
    localStorage.removeItem(this.refreshToken);
    localStorage.removeItem(this.accessToken);
    localStorage.removeItem(this.username);
  }

  refreshTokens(){
    const token = this.getRefreshToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post(`${BASE_URL}/refresh-token`, {}, httpOptions).subscribe(
      response => {
        console.log('Token refreshed successfully', response);
      },
      error => {
        console.error('Error refreshing token', error);
      }
    );
  }

}
