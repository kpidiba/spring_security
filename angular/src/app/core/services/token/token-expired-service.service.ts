import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenExpiredServiceService {

  constructor(private authService: AuthService, private router: Router) {

  }

  checkTokenExpiration() {
    // Get the token expiration time from the AuthService
    const tokenExpiration = this.authService.getTokenExpiration();

    if (tokenExpiration) {
      const currentTime = new Date().getTime() / 1000; // Current time in seconds

      // Check if the token is about to expire (e.g., within a margin of X seconds)
      const marginInSeconds = 60; // You can adjust this margin
      if ((tokenExpiration.getTime() / 1000) - currentTime < marginInSeconds) {
        // Token is about to expire, redirect to the login page
        this.logoutAndRedirect();
      }
      console.log((tokenExpiration.getTime() / 1000) - currentTime);
    } else {
      // Token doesn't exist or has no expiration, treat as invalid
      this.logoutAndRedirect();
    }
  }

  private logoutAndRedirect() {
    // Log the user out (clear tokens, user data, etc.)
    this.authService.logout();

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}