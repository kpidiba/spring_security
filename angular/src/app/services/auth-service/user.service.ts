import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

const BASE_URL = "http://127.0.0.1:8080/api/v1/";

@Injectable({
  providedIn: 'root'
})
export class UserService  {
  constructor(private http: HttpClient, private loginService: LoginService) {
  }

}

