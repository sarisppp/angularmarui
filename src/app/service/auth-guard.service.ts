import { PathService } from 'app/service/path.service';
import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  role;

  constructor( private authService: AuthService, 
    private router: Router,
    private Path: PathService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let url: string = state.url; 
      return this.checkLogin(url);
    }


  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  
  checkLogin(url: string): boolean {
    if (localStorage.getItem('status')=="true") {
       this.Path.showMe().subscribe(data=>this.role=data)
       
       if(this.role.role=="admin"){
        return true; }
       
       else{
        this.router.navigate(['/dashboard']);
        return false; 
       }
    }
     
    this.authService.redirectUrl = url; 
    this.router.navigate(['/login']);
    return false; 
  }    
  

}


