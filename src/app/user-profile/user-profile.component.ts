import { Subscriber } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/courseservice';
import { Course } from '../service/course';
import { PathService } from './../service/path.service'
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Users } from './../service/users';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ThrowStmt } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  uploadedFiles: any[] = [];

  selectedFile : File;

  upload : boolean;

  productDialog: boolean;

  products: Course[];

  product: Course;

  selectedProducts: Course[];

  submitted: boolean;

  exportColumns: any[];

  users: Users[];

  user: Users;

  profile;
  success;
  error;

  head;

  pw = {
    email: null,
    password: null,
    newpassword: null,
    conpassword: null

  }

  blockSpace: RegExp = /[^\s]/; 



  currentDate = new Date;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private courseService: CourseService,
    private pathService: PathService,
    private http: HttpClient) { }

  ngOnInit() {

    this.courseService.showMe().subscribe(data => this.profile = data);
    this.courseService.getCourseUser().subscribe(data => this.products = data);
  }

  deleteCourse(product: Course) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.course + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.courseService.deleteCourseUser(product.idregister).subscribe();
        this.products = this.products.filter(val => val._id !== product._id);
        this.product = {}
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });
  }
  checkDate(data) {
    let currentDate = new Date();
    let date = new Date(data);
    date.setDate(date.getDate() - 1);
    let checkdate = currentDate >= date;
    return checkdate;
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  save(data) {
    this.submitted = true;
    if (this.pw.newpassword != null && this.pw.conpassword) {
      if (this.pw.newpassword == this.pw.conpassword){
        this.pw.email = this.profile.email;
        this.pathService.resetPassword(data).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );
      }
      else{
        console.log('no')
      }
     
    }
    else {
      console.log('no')

    }
  
  }

  handleResponse(data: any) {
    this.success = data;
    this.productDialog = false;
    this.pw.newpassword = null;
    this.pw.password = null;
    this.pw.conpassword = null;
  
  }

  handleError(error: any) {
    this.error = error.error.error;
    this.pw.password = null;
  }

  myUploader(){
    this.upload = true;
    this.head = this.courseService.updateImage();
  }
 onUpload(event) {
  this.selectedFile = event.files[0]
  const uploadData = new FormData();
  uploadData.append('image', this.selectedFile);
  this.courseService.postFile(uploadData ,this.profile._id).subscribe(data => {
        this.messageService.add({severity: 'success', summary: "Success Updated", detail: ''});
        this.courseService.showMe().subscribe(data => this.profile = data);
        this.upload = false;
        setTimeout(function(){
          window.location.reload();
        }, 100)
       }, error => {
        this.messageService.add({severity: 'error', summary: "Error Updated", detail: ''});
      });
  }


}



  
