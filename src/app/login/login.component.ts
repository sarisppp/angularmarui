import { Component, OnInit } from '@angular/core';
import { AuthService } from './../service/auth.service';
import { PathService } from './../service/path.service';
import { TokenService } from './../service/token.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null,
  };

  private data;
  public error = null;
  constructor(private Path: PathService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.Path.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  
   
  }

  handleResponse(data: any) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.Path.showMe().subscribe(data => {this.data = data 
      this.Auth.changeRole(this.data.role);
      localStorage.setItem('roleStatus',this.data.role);
      this.router.navigateByUrl('/user-profile');
      setTimeout(function(){
        window.location.reload();
      }, 100)
    });
   
  
    
  }

  handleError(error: any) {
    this.error = error.error.error;
  }

 checkRole(data:any){
  if(data.role == 'admin'){
    return true
  }
  else{
    return false
  }
 }

}
