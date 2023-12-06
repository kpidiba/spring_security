import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core"
import { Observable } from "rxjs"
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authService = inject(AuthService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newReq = req;
        let token = this.authService.getToken();
        if (token != null) {
            newReq = newReq.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        }
        return next.handle(newReq);
    }
}