# ANGULAR SPRING LOGIN

# Overview

This project provides a comprehensive solution for implementing user authentication in an Angular application integrated with a Spring Boot backend.

### Requirements

- Angular CLI
- Node.js
- npm

### Dependencies

To set up the necessary components and functionality for user authentication, follow these steps:

1. **Create Login and Register Components**

```bash
ng generate component login
ng generate component register
```

2. **Configure Routing**
- Define routes for login and register components in your `app-routing.module.ts`.
3. **Create Guards** 

```bash
ng generate guard guards/noAuth/noAuth
ng generate guard guards/authUser/user
```

-  Implement canActivate logic in these guards to control access based on authentication status.
4. **Create Services**

```bash
ng generate service services/auth-service/auth
ng generate service services/storage/user-storage
```

5. **Install Dependencies** 

```bash
npm install jwt-decode
```

6. **Token Expired Service** 
- Implement a service to handle token expiration, and integrate it with AppComponent and AuthGuard.



### Auth Interceptor

Implement an HTTP interceptor to automatically attach the JWT token to outgoing requests.

1. **Create `auth.interceptor.ts`** 

```ts
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) {}

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

2. **Add Interceptor to main.ts file** 

```ts
bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        importProvidersFrom(BrowserModule, ReactiveFormsModule,  FormsModule),
        AuthService, [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
    .catch(err => console.error(err));
```



### DEPENDENCIES

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

2. **Add Interceptor to AppModule**

add in app.module.ts

```ts
  providers: [LoginService, AuthGuard, [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]],
```
