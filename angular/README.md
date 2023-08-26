# ANGULAR SPRING LOGIN

- create login and register components

- routing them

- create guards

```bash
ng g g guards/noAuth/noAuth
ng g g guards/authUser/user
```

- **canActive**

- create services

```bash
ng g s services/auth-service/auth
ng g s services/storage/user-storage
```

- install this

```bash
npm install jwt-decode
```

- create Token Expired Service , add it in AppComponent and AuthGuard



### AUTH INTERCEPTOR

- manually auth.interceptor.ts

```ts
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
        let token = this.loginService.getToken();
        if (token != null) {
            newReq = newReq.clone({setHeaders:{Authorization:`Bearer ${token}`}})
        }
        return next.handle(newReq);
    }
}
```



add in app.module.ts

```ts
  providers: [LoginService, AuthGuard, [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]],
```
