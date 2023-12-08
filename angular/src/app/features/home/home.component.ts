import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [MatButtonModule]
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
