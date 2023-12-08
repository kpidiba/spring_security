import { Component } from '@angular/core';
import { TokenExpiredServiceService } from './core/services/token/token-expired-service.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NavbarComponent, RouterOutlet]
})
export class AppComponent {
  title = 'angular';
  constructor(private tokenExpirationService: TokenExpiredServiceService) {}

  ngOnInit(): void {
    // Check token expiration when the app loads
    this.tokenExpirationService.checkTokenExpiration();
  }
}
