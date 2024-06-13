import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core"
import { BehaviorSubject, Observable, catchError, switchMap, throwError } from "rxjs"
import { AuthService } from "src/core/services/auth/auth.service";
import { TokenExpiredService } from "src/core/services/token-expired/token-expired-service.service";
import { TokenService } from "src/core/services/token/token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private tokenServiceExpired = inject(TokenExpiredService);
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.tokenServiceExpired.checkRefreshTokenExpiration();
    const token = this.tokenService.getAccessToken();
    if (token) {
      req = this.addToken(req, token);
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401 || error.status == 403) {
          return this.handle401Error(req, next);
        } else {
          return throwError(() => error);
        }
      })
    );
  }



  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.tokenService.refreshTokens().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          console.log(token['access_token']);
          this.tokenService.setAccessToken(token.access_token);
          console.log(token);
          this.refreshTokenSubject.next(token);
          return next.handle(this.addToken(request, token["access_token"]));
        }),
        catchError((error) => {
          console.log(error);
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(()=>error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        switchMap(token => {
          return next.handle(this.addToken(request, token));
        })
      );
    }
  }
}
