import { Component, OnInit } from '@angular/core';
import { PathService } from 'app/service/path.service';
import { Line } from './../service/line';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {
  linetoken:Line[];


  constructor(private pathservice:PathService,private confirm:ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.pathservice.getLineToken().subscribe(data=>this.linetoken = data);
  }


  changeToken(data:any){
    this.confirm.confirm({
      message: 'Are you sure you want to change the Token?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       this.pathservice.editToken(data).subscribe(data=>{});
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Token Update', life: 3000 });
      }

    });
  }


}

