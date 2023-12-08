import { Component,OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
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
  title = "ok";
  constructor(private authService:AuthService,private router:Router) {
    
  }
  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
    if(this.loggedIn){
      this.title="no";
    }
    // location.reload();
  }
  logout(){
    this.authService.logout();
    location.reload();
  }
}
