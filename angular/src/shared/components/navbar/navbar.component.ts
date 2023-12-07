import { Component,inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/core/services/auth/auth.service';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink, NgIf]
})
export class NavbarComponent implements OnInit {
  public loggedIn = false;
  private authService =inject(AuthService);
  private router = inject(Router);
  public timer!:number;

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();

  }

  logout() {
    this.authService.logout();
    location.reload();
  }
}
