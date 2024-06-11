import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  getToken() {
    return localStorage.getItem("accessToken");
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

  login(username: string,refreshToken:string,accessToken:string) {
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("username", username);
  }

  logout() {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
  }

}
