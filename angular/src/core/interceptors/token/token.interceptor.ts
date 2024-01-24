import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/core/services/auth/auth.service';
import { TokenExpiredServiceService } from 'src/core/services/token/token-expired-service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}
