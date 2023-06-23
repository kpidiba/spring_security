import { Component,OnInit } from '@angular/core';
import { LoginService } from '../services/auth-service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn = false;
  title = "ok";
  constructor(private loginService:LoginService,private router:Router) {
    
  }
  ngOnInit(): void {
    this.loggedIn = this.loginService.isLoggedIn();
    if(this.loggedIn){
      this.title="no";
    }
    // location.reload();
  }
  logout(){
    this.loginService.logout();
    location.reload();
  }
}
