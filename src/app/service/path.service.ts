
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Users } from './users';
import { Observable, of } from 'rxjs';
import { data } from 'jquery';
import { Line } from './line';


@Injectable({
  providedIn: 'root'
})
export class PathService {
  private baseUrl = 'http://localhost:8000/api/auth'
  private Urlcourse = 'http://localhost:8000/api/course'
  constructor(private http: HttpClient, private token: TokenService) { }





  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': "Bearer " + this.token.get()
    })
  }



  register(data: any) {
    return this.http.post(`${this.baseUrl}/adduser`, data)
  }


  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data)
  }

  showUser() {
    return this.http.get<User>(`${this.baseUrl}/show`)
  }

  showMe() {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token.get());
    return this.http.get<Users[]>('http://localhost:8000/api/auth/me', { headers: parameters });

  }

  checkRole(){
    let value;
   this.showMe().subscribe(data => {value = data 
  
  });

  }

  resetPassword(data:string){
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token.get());
    return this.http.post('http://localhost:8000/api/auth/resetpassword',data, { headers: parameters });
  }


  getLineToken():Observable<Line[]>{
      return this.http.get<Line[]>('http://localhost:8000/api/line/show');
  }
  editToken(data:string):Observable<Line[]>{
    return this.http.put<Line[]>('http://localhost:8000/api/line/edit',JSON.stringify(data),this.httpOptions);
}


  getUsers():Observable<User[]> {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token.get());
    return this.http.get<User[]>('http://localhost:8000/api/auth/show', { headers: parameters });

  }


  selectDelete(data: any): Observable<User[]> {
    // let parameters = new HttpHeaders();
    // parameters = parameters.set('Authorization', "Bearer " + this.token.get());
    return this.http.post<User[]>(this.baseUrl + "/deletes", JSON.stringify(data),this.httpOptions);
  }

  deleteUser(id: string): any {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token.get());
    return this.http.delete(this.baseUrl + "/delete/" + id, { headers: parameters });

  }


  addUser(data: any): Observable<User[]> {

    return this.http.post<User[]>(this.baseUrl + "/adduser", JSON.stringify(data), this.httpOptions);
  }


  updateUser(data: any): Observable<User[]> {
    // let parameters = new HttpHeaders();
    // parameters = parameters.set('Authorization', "Bearer " + this.token.get());
    return this.http.put<User[]>(this.baseUrl + "/updateuser/" + data._id, JSON.stringify(data),this.httpOptions);
  }

  add(data: any) {
    return this.http.post(`${this.Urlcourse}/add`, data)
  }

  show(data: any) {
    return this.http.get(`${this.Urlcourse}/show`, data)
  }


}
