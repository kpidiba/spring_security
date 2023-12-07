import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenExpiredServiceService } from '../../services/token/token-expired-service.service';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard  {
  constructor(private authService: AuthService, private router: Router,private tokenExpiration:TokenExpiredServiceService) {
    
  }
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
