import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from 'src/core/services/auth/auth.service';
import { DestroyService } from 'src/shared/services/destroy/destroy.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink, NgIf]
})
export class NavbarComponent implements OnInit {
  public check = false;
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyService = inject(DestroyService);
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Update the check property based on the current route
        this.isRouteActive(event.url);
      }
    });
  }

  isRouteActive(routePath: string) {
    this.check = routePath === '/login';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
