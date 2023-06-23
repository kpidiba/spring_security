import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/auth-service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  validateForm!: FormGroup;
  credentials = {
    username:'',
    password:''
  }
  constructor(private authService: AuthService,private loginService:LoginService,private router:Router, private fb: FormBuilder) {}
  ngOnInit() {
    console.log(this.loginService.isLoggedIn());
    // this.loginService.logout();
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    this.authService.login(this.validateForm.get(['username'])!.value,this.validateForm.get(['password'])!.value).subscribe({
      next:(response:any) => {
        this.loginService.loginUser(response.body.token,response.body.name);
        location.href="";
      },
      error:(error:any) => {
        console.log(error);
      }
    });
  }
  

  reset(){
    console.log("reset");
    this.validateForm.get('username')?.reset();
    this.validateForm.get('password')?.reset();
    // this.validateForm.reset();
  }

  onSubmit()
  {
    console.log("form is submit");
  }
}
