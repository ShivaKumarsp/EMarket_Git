import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  constructor(private router: Router) { }

  //Set User Secure Token
  setSecureToken(secure_token: string) {
    localStorage.setItem("LoggedIn", secure_token)
  }
  setSecureRole(secure_role: string) {
    localStorage.setItem("Role", secure_role)
  }

  //Set User Secure Token
  getSecureToken() {
    return localStorage.getItem("LoggedIn")
  }

  //Check User is LoggedIn or not!
  isLoggednIn() {
        return this.getSecureToken() !== null;
  }

  //Logout method
  logout() {
     localStorage.removeItem("LoggedIn");
     localStorage.clear();
     localStorage.setItem('Role',"Public");
     this.router.navigate(["/app/home"]);
  }
}

