import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newReq = req;
        
        // let token = this.loginService.getToken();
        // const headers = new HttpHeaders()
        //     .set('Content-Type', 'application/json')
        //     .set('Authorization', 'Bearer ' + token);
        // if (token != null) {
        //     newReq.clone({
        //         headers: headers
        //     })
        // }
        return next.handle(newReq);
    }
}