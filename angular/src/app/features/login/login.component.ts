import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

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
  constructor(private authService:AuthService,private router:Router, private fb: FormBuilder) {}
  ngOnInit() {
    console.log(this.authService.isLoggedIn());
    // this.loginService.logout();
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    this.authService.login(this.validateForm.get(['username'])!.value,this.validateForm.get(['password'])!.value).subscribe({
      next:(response:any) => {
        this.authService.loginUser(response.body.token,response.body.name);
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