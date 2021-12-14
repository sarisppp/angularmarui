
import { Course } from './../service/course';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/courseservice';
import { PathService } from './../service/path.service'
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { AuthService } from './../service/auth.service';
import { CourseRegister } from 'app/service/course-register';
import { TokenService } from './../service/token.service';
import { Users } from 'app/service/users';
import { datalabeling } from 'googleapis/build/src/apis/datalabeling';
import { toHash } from 'ajv/dist/compile/util';

@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  public loggedIn: any;
  public loggedOut: any;
  items: Course[];
  item: Course;
  users: Users[];
  user: Users;
  courses: CourseRegister[];
  course: CourseRegister;
  id: number;
  profile;
  checkduplicate: boolean = true;
  products: Course[];
  check: boolean = true;
  error;
  expire;
  full:boolean;
  
  data:any;


  constructor(
    private courseService: CourseService,
    private pathService: PathService,
    private Auth: AuthService,
    private router: ActivatedRoute) {
    let id = router.snapshot.params['id'];
    this.id = id

  }

  ngOnInit() {
    this.Auth.authStatus.subscribe(value => {
      if(value===true){
        this.loggedIn = true;
        this.courseService.getCourseUser().subscribe(data => {
          this.duplicateCheck(data)
        }, (error => this.handleError(error)));
    
        this.courseService.getCourse().subscribe(data =>{ this.items = data
          this.data = this.items[this.id].description
        this.infull(this.items);
        });
        this.pathService.showMe().subscribe(data => this.profile = data);

      }
      else{
        this.loggedIn = false;
        this.courseService.getCourse().subscribe(data => {this.items = data
        this.data = this.items[this.id].description
        });
      }
  
    });
   
  


  }

  infull(data:any){
    if(data[this.id].registed==data[this.id].limited){
      return this.full = true;
    }
    else{
      return this.full = false;
    }
  }

  handleError(error: any) {
    this.checkTime();
    this.check = false;
    this.checkduplicate = false;
 
  }

  register() {

    this.course = {
      idcourse: this.items[this.id]._id,
      iduser: this.profile._id
    };
    this.courseService.registerCourse(this.course).subscribe(data => {
      this.courseService.sentLine(this.course).subscribe();
    })
  

  }

  duplicateCheck(data) {
   
      this.checkTime();
      this.products = data;
      for (var i = 0; i < this.products.length; i++) {

        if (this.items[this.id]._id == this.products[i]._id) {
          this.checkduplicate = true;
          break;
        }
        else {
          this.check = false;
          this.checkduplicate = false;
        }
      }

    }
  

  checkTime(){
    let datenow = new Date();
    let dateCourse = new Date(this.items[this.id].date);
    dateCourse.setDate(dateCourse.getDate() - 1);
    let timenow = datenow.getTime();
    let timeCourse = dateCourse.getTime()
    if( timenow > timeCourse){
      return this.expire = true;
    }
    else{
      return this.expire = false;
    }
  }

}
