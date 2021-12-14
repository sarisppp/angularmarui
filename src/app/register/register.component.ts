import { Component, OnInit } from '@angular/core';
import { PathService } from 'app/service/path.service';
import { CourseService } from 'app/service/courseservice';
import { User } from 'app/service/user';
import { Users } from 'app/service/Users';
import { Course } from './../service/course';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {SelectItem} from 'primeng/api';
import { findIndex } from 'rxjs-compat/operator/findIndex';



@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  statuses: SelectItem[];

  title: SelectItem[];
  
  role:SelectItem[];


  productDialog: boolean;

  userDialog: boolean;

  users: User[];

  user: User;

  profile:Users[];

  selectedUsers: User[];

  submitted: boolean;

  courseUser : boolean;

  exportColumns: any[];

  header = {user :""};

  courses:Course[];
  course:Course;
  erroruser : any;
    
  profileUser:any;
  employeeid:any;
  firstname:any;
  lastname:any;
  position:any;
  department:any;
  image:any;

  excelfile:any ={"_id":"","course":"","speaker":""
                  ,"place":"","hour":"","date":"","time":"","category":"","status":""};



  constructor( private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private pathService:PathService,
    private courseService: CourseService) { }

    ngOnInit() {

      this.pathService.getUsers().subscribe(data =>{this.users = data
      this.profile = data});
      
      this.statuses = [{label: 'บริหาร', value: 'บริหาร'},{label: 'สำนักงานบริหารเลขาส่วนกลาง', value: 'สำนักงานบริหารเลขาส่วนกลาง'},{label: 'การเงิน', value: 'การเงิน'}
      ,{label:"บัญชี",value:"บัญชี"},{label:"ทรัพยากรบุคคล",value:"ทรัพยากรบุคคล"},{label:"กฏหมายแและนิติกรรม",value:"กฏหมายแและนิติกรรม"}
      ,{label:"กำกับดูแลกิจการ",value:"กำกับดูแลกิจการ"},{label:"เทคโนโลยีสารสนเทศ",value:"เทคโนโลยีสารสนเทศ"},{label:"พัฒนาธุรกิจและบริหารโครงการ",value:"พัฒนาธุรกิจและบริหารโครงการ"}
      ,{label:"ขาย",value:"ขาย"},{label:"การตลาด",value:"การตลาด"},{label:"ก่อสร้าง",value:"ก่อสร้าง"},{label:"ธุรการโครงการ",value:"ธุรการโครงการ"}
      ,{label:"บริการหลังการขาย",value:"บริการหลังการขาย"},{label:"บริการ",value:"บริการ"},{label:"คลังวัสดุ",value:"คลังวัสดุ"},{label:"สำนักงานส่วนกลาง",value:"สำนักงานส่วนกลาง"}]
    this.role = [{label:'USER',value:'user'},{label:'ADMIN',value:'admin'}]
    this.title = [{label:'นาย',value:'นาย'},{label:'นางสาว',value:'นางสาว'},{label:'นาง',value:'นาง'}]
}
  
 openNew() {
    this.user = {};
    this.submitted = false;
    this.productDialog = true;
  }

  
  deleteSelectedUsers() {
   
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected User?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this.selectedUsers);
        this.pathService.selectDelete(this.selectedUsers).subscribe()
        this.users = this.users.filter(val => !this.selectedUsers.includes(val));
        this.selectedUsers = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
      }

    });
  }
  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;

  }



 CourseUser(user:Users){
   this.header.user = user.firstname +" "+ user.lastname;
   this.courseService.courseUser(user._id).subscribe(data=>{this.courses = data;
    this.excelfile = data;
    let x = this.profile[this.findIndexById(user._id)] 
    this.employeeid = x.employeeid;
    this.firstname = x.firstname
    this.lastname = x.lastname
    this.position = x.position
    this.department = x.department
    this.image = x.image
    this.courseUser = true;
   },(error:any)=>{this.erroruser = error.error.error
    let x = this.profile[this.findIndexById(user._id)] 
    this.employeeid = x.employeeid;
    this.firstname = x.firstname
    this.lastname = x.lastname
    this.position = x.position
    this.department = x.department
    this.image = x.image
    this.courseUser = true;
    this.messageService.add({ severity: 'info', summary: 'แจ้งเตือน', detail: this.erroruser, life: 4000 });
  });
}
   
  


deleteUser(user: User) {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete ' + user.firstname + '?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',

    accept: () => {
      this.pathService.deleteUser(user._id).subscribe();
      this.users = this.users.filter(val => val._id !== user._id);
      this.user = {}
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    }
  });
}

hideDialog() {
  this.productDialog = false;
  this.userDialog = false;
  this.submitted = false;
}

saveUser() {
  this.submitted = true;

  if (this.user.firstname.trim()) {
 
    if (this.user._id) {
      this.pathService.updateUser(this.user).subscribe((data: {}) => {
        this.users[this.findIndexById(this.user._id)] = this.user;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
        this.pathService.getUsers().subscribe(data => this.users = data);
      });

      this.users = [...this.users];
      this.userDialog = false;
      this.productDialog = false;
      this.user = {};

    }
    else {
      this.pathService.addUser(this.user).subscribe((data: {}) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
        this.submitted = true;
        this.productDialog = false;
        this.userDialog = false;
        this.pathService.getUsers().subscribe(data => this.users = data);

      },(error:any)=>{
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: error.error.message, life: 5000 });
      });
    }
  }
}



findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.users.length; i++) {
    if (this.users[i]._id === id) {
      index = i;
      break;
    }
  }

  return index;
}



exportExcel() {
  import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(this.users);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "products");
  });
}


saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
    type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}


exportExcelCourse() {

  import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(this.excelfile);
    const workbook = { Sheets: { [this.header.user]: worksheet }, SheetNames: [this.header.user] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "ประวัติการอบรม");
  });
}

}
