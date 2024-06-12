import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  setUserRole(role: string) {
    localStorage.setItem("role", role);
  }

  getUserRole(){
    return localStorage.getItem("role");
  }

  hasRole(role: string): boolean {
    return localStorage.getItem("role") == role;
  }

  logout(){
    return localStorage.removeItem("role");
  }
}
