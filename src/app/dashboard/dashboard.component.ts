import { filter,map } from 'rxjs/operators';
import { Component, OnInit,Input } from '@angular/core';
import * as Chartist from 'chartist';
import { CourseService } from '../service/courseservice';
import { Course } from 'app/service/course';
import { Router } from '@angular/router';
import { DetailsCourseService } from './../service/details-course.service'
import { Observable, of } from 'rxjs';
import { _ } from 'ajv';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: Course[];
  filteredItems: Course[];
  item: Course;
  // items: Observable<Course[]> = of([]);

  private _searchTerm:string;

  get searchTerm():string{
    return this._searchTerm;
  }
  set searchTerm(value:string){
    this._searchTerm = value;
    this.filteredItems = this.searchBox(value);
    // console.log(1+" "+JSON.stringify(this.filteredItems))
    // console.log(2+" "+JSON.stringify(this.items))
  }

  searchBox(searchString:string){
    return this.items.filter(data=>data.course.toLowerCase().indexOf(searchString.toLowerCase())!==-1);
  }


  constructor(private courseService: CourseService,
              private router:Router,
              private data:DetailsCourseService,
             ) { }

  onSelect(idCourse:string){
    let id = this.items.findIndex(x=>x._id === idCourse); 
    this.router.navigateByUrl("/course/"+id)
  }

  
 
  ngOnInit() {
     
      this.courseService.getCourse().subscribe(data=>{
        this.items = data;
        this.filteredItems = this.items;
      });
     
   

    
  }

   
}


