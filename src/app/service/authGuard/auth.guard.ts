import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../authService/auth.service';


@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate,CanActivateChild  {
  //constructor initialization
  //public jwtHelper: JwtHelperService = new JwtHelperService();
  token:any;

  constructor(private authService: AuthService,   private route: Router){  }
  public jwtHelper: JwtHelperService = new JwtHelperService();

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
    // if(this.authService.isLoggednIn()){
    //  return true;
    // }
    // else{
    //   this.route.navigate(["/app/home"]);
    //     return false;
    // }
}

canActivateChild(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return this.canActivate(next, state);
}

checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
  
  if (this.authService.isLoggednIn()) {
    
    const userRole = localStorage.getItem('Role');
    if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
      localStorage.removeItem("LoggedIn");
      localStorage.clear();
      localStorage.setItem('Role',"Public");
      this.route.navigate(["/app/home"]);
      return false;
    }
    return true;
  }
  localStorage.clear();
  localStorage.setItem('Role',"Public");
  this.route.navigate(["/app/home"]);
  return false;
}
}