
import { Injectable } from '@angular/core';
import { TokenService } from './../service/token.service';
import { BehaviorSubject } from 'rxjs';
import { PathService } from './path.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject <boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  private role = new BehaviorSubject <string>(localStorage.getItem('roleStatus'));
  roleStatus = this.role.asObservable();
  public redirectUrl: string



  
  changeAuthStatus(value:boolean){
    localStorage.setItem('status',value.toString());
    this.loggedIn.next(value)
  }


  changeRole(value:string){
    this.role.next(value)
  }

    constructor(private Token:TokenService,private pathservice:PathService) { }

}
