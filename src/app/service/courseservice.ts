import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from './course';
import { User } from './user';
import { Observable, of, Subscriber } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CourseRegister } from './course-register';



@Injectable()
export class CourseService {


    constructor(private http: HttpClient,private token : TokenService) { }

    private baseUrl = 'http://localhost:8000/api/course/';


    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    }

    // getProducts() {
    //     return this.http.get<any>('http://localhost:8000/api/course/show')
    //     .toPromise()
    //     .then(res => <Course[]>res.data)
    //     .then(data => { return data; });
    // }

    getCourseUser(){
        let parameters = new HttpHeaders();
        parameters = parameters.set('Authorization', "Bearer " + this.token.get());
        return this.http.get<Course[]>('http://localhost:8000/api/course/profile', { headers: parameters });
    }

    getRegisterUser(id:string){
        let parameters = new HttpHeaders();
        parameters = parameters.set('Authorization', "Bearer " + this.token.get());
        return this.http.get<User[]>('http://localhost:8000/api/course/registeruser/'+id, { headers: parameters });
    }

    addRegisterUser(id:any){
        let parameters = new HttpHeaders();
        parameters = parameters.set('Authorization', "Bearer " + this.token.get());
        return this.http.post('http://localhost:8000/api/course/adduser/',id, { headers: parameters });
    }

    deleteCourseUser(id:string):any{ 
            return this.http.delete(this.baseUrl + "deletecourse/" + id);
    }
   
    getCourse():Observable<Course[]> {
    
        return this.http.get<Course[]>('http://localhost:8000/api/course/show');
    }

    
    courseUser(data:string):Observable<Course[]>{
        return this.http.get<Course[]>('http://localhost:8000/api/course/courseuser/'+data);
    }
  

   
    getUser() {
        return this.http.get<Course[]>('http://localhost:8000/api/course/showuser');
    }

    updateImage(){
        let parameters = new HttpHeaders();
        parameters = parameters.set('Authorization', "Bearer " + this.token.get());
        return parameters
    }

    postFile(data: any,id : string): Observable<any> {
    
        const formData: FormData = new FormData();
        for (let file of data) {
          formData.append('image', file.data, file.data.name);
        }
        let parameters = new HttpHeaders();
        parameters = parameters.set('Authorization', "Bearer " + this.token.get());
        return this.http.post('http://localhost:8000/api/auth/setimage/'+id, data ,{headers:parameters});
      }

    selectDeleteUserRegister(data:any){
        this.httpOptions['body']=data;
        console.log(this.httpOptions);
        return this.http.delete(this.baseUrl + "deleteregister", this.httpOptions);
    }
   

    selectDelete(data:any):Observable<Course[]>{
        return this.http.post<Course[]>(this.baseUrl + "deletes", JSON.stringify(data), this.httpOptions);
    }

    deleteCourse(id:string):any{ 
        return this.http.delete(this.baseUrl + "delete/" + id);
        
    }

    addCourse(data: any): Observable<Course[]> {
        
        return this.http.post<Course[]>(this.baseUrl + "add", JSON.stringify(data), this.httpOptions);
    }


    updateCourse(data:any):Observable<Course[]>{
      
        return this.http.put<Course[]>(this.baseUrl + "update/" +data._id, JSON.stringify(data), this.httpOptions);
    }

    updateCourseRegister(data){
        return this.http.put(this.baseUrl + "updateregister",JSON.stringify(data),this.httpOptions);
    }

    
  showMe() {
    let parameters = new HttpHeaders();
    parameters = parameters.set('Authorization', "Bearer " + this.token.get());
    return this.http.get<User[]>('http://localhost:8000/api/auth/me', { headers: parameters });

  }


 /**  -------======= RegisterCourse ========-------------  **/
            

        registerCourse(data: any): Observable<CourseRegister[]> {
            return this.http.post<CourseRegister[]>('http://localhost:8000/api/course/register', JSON.stringify(data), this.httpOptions);
        }

        sentLine(data:any):Observable<CourseRegister[]>{
            return this.http.post<CourseRegister[]>('http://localhost:8000/api/course/line', JSON.stringify(data), this.httpOptions);
        }

    // UserService

    // getUser(){
    //     return this.http.get<Course[]>('http://localhost:8000/api/auth/show');
    // }

    // async getProducts() {
    //     let result = await this.http.get<Course[]>('http://localhost:8000/api/course/show')
    //         .toPromise()
    //         // .toPromise().then(data => { return (JSON.stringify(data)) })
    //         // .then(res => <Course>res);
    //     return result
    // }

        // .then(res =>{alert(JSON.stringify(res));
        // return res
        // })
    


    getCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(this.baseUrl + "show")
            .pipe(
                tap(u => console.log("success")),
                catchError(this.handleError('getUsers', [])),
            );

    }

   

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(operation + ':' + error.message);
            return of(result as T);
        };
    }



    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < 7; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return text;
    }

}



