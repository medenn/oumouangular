import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiserviceService } from './apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiservice: ApiserviceService,private router: Router ) {}
  canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean {
  const routeurl: string = state.url;
  return this.isLogin(routeurl);
  }


  isLogin(routeurl: string) {
    if (this.apiservice.isLoggedIn()) {
    return true;
    }else{
        return false; 
    }
    
    this.apiservice.redirectUrl = routeurl;
    this.router.navigate(['/login'], {queryParams: { returnUrl: routeurl }} );
    }
}
