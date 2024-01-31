import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntil } from 'rxjs';
import { DestroyService } from 'src/core/services/destroy/destroy.service';
import { AuthenticationResponse } from 'src/core/models/AuthentificationResponse';
import { RoleService } from 'src/core/services/role/role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, JsonPipe]
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  private destroyService = inject(DestroyService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private roleService = inject(RoleService);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    this.authService.login(this.validateForm.value).pipe(takeUntil(this.destroyService.onDestroy$)).subscribe(
      {
        next: (response) => {
          this.authService.loginUser(response.token, response.name);
          this.router.navigate(["/"]);
          this.roleService.setUserRole(response.role);
          console.log(response.role);
          this.reset();
        },
        error(err) {
          console.error(err);
        },
        complete() {
          console.info("Authentification success");
        },
      }
    )
  }


  reset() {
    this.validateForm.reset();
  }

}
