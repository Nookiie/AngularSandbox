import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { CourseListComponent } from './course-list/course-list.component';
import { from } from 'rxjs';
import { UserListComponent } from './user-list/user-list.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { JsonGetService } from 'src/assets/services/json.get.service';
import { AccountInfoComponent } from './account-info/account-info.component';
import { IndexComponent } from './index/index.component';

const routes: Route[] = [
  {
    path: 'course-add',
    component: CourseFormComponent
  },
  {
    path: 'account-edit/:id',
    component: AccountEditComponent
  },
  {
    path: 'course-add/:id',
    component: CourseFormComponent
  },
  {
    path: 'user-add',
    component: RegisterFormComponent
  },
  {
    path: 'user-add/:id',
    component: RegisterFormComponent
  },
  {
    path: "course-list",
    component: CourseListComponent
  },
  {
    path: "user-list",
    component: UserListComponent
  },
  {
    path: 'account-info',
    component: AccountInfoComponent
  },
  {
    path: 'account-info/:id',
    component: AccountInfoComponent
  },
  {
    path: 'register-form',
    component: RegisterFormComponent
  },
  {
    path: 'login-form',
    component: LoginFormComponent
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: '**',
    redirectTo: 'index'
  },
  
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    LoginFormComponent,
    UserManagementComponent,
    CourseManagementComponent,
    AccountEditComponent,
    AccountInfoComponent,
    CourseListComponent,
    CourseListItemComponent,
    CourseFormComponent,
    UserListItemComponent,
    UserListComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
