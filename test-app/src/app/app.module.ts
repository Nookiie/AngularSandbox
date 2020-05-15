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

const routes: Route[] = [
  // {
  //   path: 'courses-table-list',
  //   component: MoviesTableComponent
  // },
  // {
  //   path: 'users-list',
  //   component: MoviesCardsListComponent
  // },
  {
    path: 'course-add',
    component: CourseFormComponent
  },
  {
    path: 'course-add/:id',
    component: CourseFormComponent
  },
  // {
  //   path: 'course-add/:id',
  //   component: MovieReactiveFormComponent
  // },
  // {
  //   path: 'movie-add/:id',
  //   component: MovieReactiveFormComponent
  // },
  // {
  //   path: 'user-add/',
  //   component: MovieReactiveFormComponent
  // },
  // {
  //   path: 'user-add/:id',
  //   component: MovieReactiveFormComponent
  // },

  {
    path: "course-list",
    component: CourseListComponent
  },
  {
    path: "user-list",
    component: UserListComponent
  },
  {
    path: 'account-edit/:id',
    component: AccountEditComponent
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
    path: '**',
    redirectTo: 'courses-table-list'
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
    CourseListComponent,
    CourseListItemComponent,
    CourseFormComponent,
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
