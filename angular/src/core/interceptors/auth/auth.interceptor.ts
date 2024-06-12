import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core"
import { Observable } from "rxjs"
import { AuthService } from "src/core/services/auth/auth.service";
import { TokenExpiredService } from "src/core/services/token-expired/token-expired-service.service";
import { TokenService } from "src/core/services/token/token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authService = inject(AuthService);
    private tokenService = inject(TokenService);
    private tokenServiceExpired = inject(TokenExpiredService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newReq = req;
        this.tokenServiceExpired.checkAccessTokenExpiration();
        if(this.tokenServiceExpired.checkAccessTokenExpiration()){
          this.tokenService.refreshTokens();
        }
        let token = this.tokenService.getAccessToken();
        if (token != null) {
            newReq = newReq.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        }
        return next.handle(newReq);
    }
}
