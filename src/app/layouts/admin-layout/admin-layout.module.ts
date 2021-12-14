
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AuthService } from 'app/service/auth.service';


import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { LineComponent } from './../../line/line.component';
import { CourseDetailComponent } from './../../course-detail/course-detail.component';
import { RegisterComponent } from './../../register/register.component';



import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

import {InputMaskModule} from 'primeng/inputmask';
import {EditorModule} from 'primeng/editor';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {FocusTrapModule} from 'primeng/focustrap';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import {PasswordModule} from 'primeng/password';
import { DividerModule } from "primeng/divider";
import {KeyFilterModule} from 'primeng/keyfilter';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {HttpClientModule} from '@angular/common/http';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { QuillModule } from 'ngx-quill'


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    TableModule,
    ToastModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    CardModule,
    FocusTrapModule,
    PasswordModule,
    DividerModule,
    KeyFilterModule,
    ConfirmPopupModule,
    HttpClientModule,
    AvatarModule,
    AvatarGroupModule,
    EditorModule,
    QuillModule,
    InputMaskModule,


  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    LineComponent,
    CourseDetailComponent,
    RegisterComponent,
  ],
  providers: [MessageService,ConfirmationService,AuthService],
})

export class AdminLayoutModule {}


