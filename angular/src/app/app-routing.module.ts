import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes} from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { UserComponent } from './features/user/user.component';
import { UserGuard } from './core/guards/authUser/user.guard';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: '', component: HomeComponent,pathMatch:'full' ,canActivate:[UserGuard]},
  { path: 'signup', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
