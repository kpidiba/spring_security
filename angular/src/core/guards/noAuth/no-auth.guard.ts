import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/core/services/auth/auth.service';
import { TokenExpiredServiceService } from 'src/core/services/token/token-expired-service.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,private tokenExpiration:TokenExpiredServiceService) {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isLoggedIn()) {
        this.tokenExpiration.checkTokenExpiration();
        this.router.navigate(['']);
        return false;
      }
      return true;
  }
  
}
