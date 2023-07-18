import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/auth-service/user.service';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {

  }
  ngOnInit(): void {
  }


  getUsers() {
    this.authService.user().subscribe(  
      {
            next:(res) =>
            {
              console.log(res);
              return res;
            },
            error:(error) =>{
              console.log(error);
              return error;
            }
          }
    );
  }

}
