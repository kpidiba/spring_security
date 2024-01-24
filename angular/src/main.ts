import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { Routes, provideRouter } from '@angular/router';
import { UserGuard } from './core/guards/authUser/user.guard';
import { AuthInterceptor } from './core/interceptors/auth/auth.interceptor';
import { AuthService } from './core/services/auth/auth.service';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { UserComponent } from './features/user/user.component';
import { NoAuthGuard } from './core/guards/noAuth/no-auth.guard';


const routes: Routes = [
    { path: 'users', component: UserComponent },
    { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [UserGuard] },
    { path: 'signup', component: RegisterComponent,canActivate:[UserGuard] },
    { path: 'login', component: LoginComponent,canActivate:[NoAuthGuard] },
];

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        importProvidersFrom(BrowserModule, ReactiveFormsModule,  FormsModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatInputModule),
        AuthService, [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
    .catch(err => console.error(err));
