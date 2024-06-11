import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenExpiredService } from '../../services/token-expired/token-expired-service.service';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard  {

  private authService = inject(AuthService);
  private router =inject(Router);
  private tokenExpiration = inject(TokenExpiredService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isLoggedIn()) {
        this.tokenExpiration.checkTokenExpiration();
        return true;
      }
      this.router.navigate(['login']);
      return false;
  }

}
