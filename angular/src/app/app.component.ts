import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenExpiredServiceService } from 'src/core/services/token/token-expired-service.service';
import { NavbarComponent } from 'src/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [NavbarComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  constructor(private tokenExpirationService: TokenExpiredServiceService) {}

  ngOnInit(): void {
    // Check token expiration when the app loads
    this.tokenExpirationService.checkTokenExpiration();
  }
}
