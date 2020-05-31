import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { UserManagementComponent } from './user/user-management/user-management.component';
import { CourseManagementComponent } from './course/course-management/course-management.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { CourseListItemComponent } from './course/course-list-item/course-list-item.component';
import { CourseFormComponent } from './course/course-form/course-form.component';
import { UserListItemComponent } from './user/user-list-item/user-list-item.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { IndexComponent } from './index/index.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { AuthGuard } from './auth/guards/authguard';
import { NonAuthenticatedGuard } from './auth/guards/non-authguard';
import { AdminAuthGuard } from './auth/guards/admin.authguard';

const routes: Route[] = [
  {
    path: 'course-add',
    component: CourseFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'account-edit',
    component: AccountEditComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'course-add/:id',
    component: CourseFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'user-add',
    component: UserFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'user-add/:id',
    component: UserFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: "course-list",
    component: CourseListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user-list",
    component: UserListComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'account-info',
    component: AccountInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account-info/:id',
    component: AccountInfoComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'register-form',
    component: RegisterFormComponent,
    canActivate: [NonAuthenticatedGuard]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [NonAuthenticatedGuard]
  },
  {
    path: 'index',
    component: IndexComponent,
    canActivate: [AuthGuard]
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
    UserFormComponent,
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
