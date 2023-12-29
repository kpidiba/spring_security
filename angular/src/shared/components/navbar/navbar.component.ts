import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from 'src/core/services/auth/auth.service';
import { DestroyService } from 'src/shared/services/destroy/destroy.service';
import { takeUntil } from 'rxjs';
import { TokenExpiredServiceService } from 'src/core/services/token/token-expired-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink, NgIf]
})
export class NavbarComponent implements OnInit {
  public timer: number | null = null;
  public remainingTime: { minutes: number; seconds: number } = { minutes: 0, seconds: 0 };
  public check = false;
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyService = inject(DestroyService);
  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.destroyService.onDestroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Update the check property based on the current route
        this.isRouteActive(event.url);
      }
    });
    this.updateTimer();
  }

  isRouteActive(routePath: string) {
    this.check = routePath === '/login';
  }

  updateTimer(): void {
    // Update every second
    if (this.check) {
      setInterval(() => {
        const currentTime = new Date().getTime();
        const expirationDate = this.authService.getTokenExpiration();

        if (expirationDate instanceof Date) {  // Check if it's a Date
          const remainingTime = expirationDate.getTime() - currentTime;
          this.remainingTime = this.calculateRemainingTime(remainingTime);// Convert milliseconds to minutes
        } else {
          console.error('Token expiration date is null or not a Date.');
        }
      }, 1000);
    }
  }

  calculateRemainingTime(milliseconds: number): { minutes: number; seconds: number } {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { minutes, seconds };
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}