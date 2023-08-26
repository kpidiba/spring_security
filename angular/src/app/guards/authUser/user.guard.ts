import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/auth-service/login.service';
import { TokenExpiredServiceService } from 'src/app/services/token/token-expired-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard  {
  constructor(private loginService: LoginService, private router: Router,private tokenExpiration:TokenExpiredServiceService) {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.loginService.isLoggedIn()) {
        this.tokenExpiration.checkTokenExpiration();
        return true;
      }
      this.router.navigate(['login']);
      return false;
  }
  
}
