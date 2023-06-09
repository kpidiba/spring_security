import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  validateForm!: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder) {}
  ngOnInit() {
    console.log('man with mission');
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    this.authService.login(this.validateForm.get(['username'])!.value,this.validateForm.get(['password'])!.value).subscribe((res: any) => {
      console.log(res);
    })
  }
}
