import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from './course';
import { User } from './user';
import { CourseRegister } from './course-register';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RegisterCourseService {

  constructor(private http: HttpClient,private token : TokenService) { }

  private baseUrl = 'http://localhost:8000/api/course/';

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    })
}

getCourseRegister() {
  return this.http.get<Course[]>(this.baseUrl + "showregister");
}

addCourseRegister(data: any): Observable<Course[]> {
  // console.log(data);
  return this.http.post<CourseRegister[]>(this.baseUrl + "add", JSON.stringify(data), this.httpOptions);
}


}
