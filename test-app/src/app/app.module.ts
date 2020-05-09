import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { UserAdministrationComponent } from './user-administration/user-administration.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    LoginFormComponent,
    UserManagementComponent,
    CourseManagementComponent,
    AccountEditComponent,
    UserAdministrationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
