import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { takeUntil } from 'rxjs';
import { AuthService } from 'src/core/services/auth/auth.service';
import { DestroyService } from 'src/core/services/destroy/destroy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatButtonModule]
})
export class HomeComponent implements OnInit {
  private authService = inject(AuthService);
  private destroyService = inject(DestroyService);
  
  ngOnInit(): void {
  }


  getUsers() {
    this.authService.user().pipe(takeUntil(this.destroyService.onDestroy$)).subscribe(
      {
        next: (res) => {
          console.log(res);
          return res;
        },
        error: (error) => {
          console.log(error);
          return error;
        }
      }
    );
  }

}
