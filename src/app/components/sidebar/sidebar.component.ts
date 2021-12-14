
import { Component, OnInit } from '@angular/core';
import { TokenService } from './../../service/token.service';
import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { delay } from 'rxjs-compat/operator/delay';


declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'All Courses', icon: 'dashboard', class: ''},
  // { path: '/user-profile', title: 'User Profile', icon: 'person', class: ''},
  // { path: '/table-list', title: 'Table List', icon: 'content_paste', class: ''},
  // { path: '/typography', title: 'Typography', icon: 'library_books', class: ''},
  { path: '/login', title: 'Login', icon: 'login', class: ''},
];

export const ROUTESLOGINED: RouteInfo[] = [
  { path: '/dashboard', title: 'All Courses', icon: 'dashboard', class: ''},
  { path: '/user-profile', title: 'User Profile', icon: 'person', class: ''},
  { path: '/table-list', title: 'Training Course', icon: 'content_paste', class: ''},
  { path: '/register', title: 'Register', icon: 'person_add', class: ''},
  { path: '/line', title: 'Line Token', icon: 'edit_notifications', class: ''},
  // { path: '/detail', title: 'Detail', icon: 'event_note', class: ''},
 
];

export const ROUTESUSER: RouteInfo[] = [
  { path: '/dashboard', title: 'All Courses', icon: 'dashboard', class: ''},
  { path: '/user-profile', title: 'User Profile', icon: 'person', class: ''},
  // { path: '/detail', title: 'Detail', icon: 'event_note', class: ''},
 
];


export const LOGOUT: RouteInfo[] = [
  { path: '/login', title: 'Logout', icon: 'logout', class: ''},
]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public loggedIn: any;
  menuItems: any[];
  menuItemLogined: any[];
  menuItemUser: any[];
  menuLogout: any[];
  public role: any;

  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.menuItemLogined = ROUTESLOGINED.filter(menuItemLogined => menuItemLogined);
    this.menuItemUser = ROUTESUSER.filter(menuItemUser => menuItemUser);
    this.menuLogout = LOGOUT.filter(menuLogout => menuLogout);
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    this.Auth.roleStatus.subscribe(value => this.role = value);
    
  }


  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    localStorage.removeItem('roleStatus');
    this.router.navigateByUrl('/login');
    setTimeout(function(){
      window.location.reload();
    }, 100)

      this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/NavbarComponent']);
    }); 
  }
}
