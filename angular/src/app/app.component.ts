import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenExpiredServiceService } from 'src/core/services/token/token-expired-service.service';
import { NavbarComponent } from 'src/shared/components/navbar/navbar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NavbarComponent, RouterOutlet]
})
export class AppComponent {
  title = 'angular';
  private tokenExpirationService = inject(TokenExpiredServiceService);

  ngOnInit(): void {
    // Check token expiration when the app loads
    this.tokenExpirationService.checkTokenExpiration();
  }
}
