import { Component } from '@angular/core';
import { TokenExpiredServiceService } from './core/services/token/token-expired-service.service';

@Component({
  selector: 'app-root',
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
