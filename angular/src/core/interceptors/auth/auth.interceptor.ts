import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core"
import { Observable } from "rxjs"
import { AuthService } from "src/core/services/auth/auth.service";
import { TokenExpiredServiceService } from "src/core/services/token/token-expired-service.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authService = inject(AuthService);
    private tokenService = inject(TokenExpiredServiceService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newReq = req;
        let token = this.authService.getToken();
        this.tokenService.checkTokenExpiration();
        if (token != null) {
            newReq = newReq.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        }
        return next.handle(newReq);
    }
}