import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  getToken() {
    return localStorage.getItem("token");
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

  login(token: string, username: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

}
