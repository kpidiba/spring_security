import { bootstrapApplication } from '@angular/platform-browser';
import { Routes, provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { UserGuard } from './core/guards/authUser/user.guard';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [UserGuard],
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'users',
    loadComponent: () => import("./features/user/user.component").then(m => m.UserComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./features/user/user.component').then(m => m.UserComponent)
  },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadChildren: () => import('./features/register/register.component').then(m => m.RegisterComponent)
  }
]
bootstrapApplication(AppComponent, { providers: [provideRouter(routes), provideHttpClient(), [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]] }).catch((err) => console.error(err));