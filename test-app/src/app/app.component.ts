import { Component } from '@angular/core';
import { User } from '../assets/model/user';
import { Course } from '../assets/model/course';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { CourseRating } from '../assets/model/courseRating';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { JsonObject, JsonProperty, JsonConvert } from 'json2typescript';

import * as courseData from './../assets/Storage/courses.json';
import * as userData from './../assets/Storage/users.json';
import { UserManagement } from 'src/assets/logic/userManagement';
import { CourseManagement } from 'src/assets/logic/courseManagement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'test-app';

  isLoggedIn: boolean;
  isAdmin: boolean;
  showError: boolean;

  currentUpdateEntity: number;
  currentLoggedInUser: User;

  userNameInput: string;
  userPassInput: string;
  userFNameInput: string;
  userLNameInput: string;
  userEmailInput: string;

  courseTitleInput: string;
  courseDescInput: string;
  courseDateOfPublishInput: string;

  jsonConvert: JsonConvert;

  courseInput: string;

  users: User[] = [
    {
      "username": "maman59",
      "password": "maman98",
      "fname": "David",
      "lname": "Peterbough",
      "email": "maman@gmail.com"
    },
    {
      "username": "maman68",
      "password": "maman68",
      "fname": "Viktor",
      "lname": "Gill",
      "email": "davar@gmail.com"
    },
    {
      "username": "some_stupid_username",
      "password": "some_stupid_password",
      "fname": "George",
      "lname": "Smith",
      "email": "george.smith@gmail.com"
    }
  ];

  courses: Course[] = [
    {
      "title": "Internet Technologies",
      "description": "This is the description",
      "dateOfPublishing": "2020-04-19",
      "ratings": [{
        "username": "Peter Thoroughbrow",
        "rating": 6
      },
      {
        "username": "George Davidson",
        "rating": 6
      },
      {
        "username": "James Goodwill",
        "rating": 6
      }
      ]
    },
    {
      "title": "Big Data",
      "description": "Big Data Stuff",
      "dateOfPublishing": "2020-04-16",
      "ratings": [{
        "username": "Peter Thoroughbrow",
        "rating": 6
      },
      {
        "username": "George Davidson",
        "rating": 4
      },
      {
        "username": "James Goodwill",
        "rating": 6
      }
      ]
    },
    {
      "title": "Angular Learning",
      "description": "Big Data Stuff",
      "dateOfPublishing": "2020-03-15",
      "ratings": [{
        "username": "Peter Thoroughbrow",
        "rating": 2
      },
      {
        "username": "George Davidson",
        "rating": 6
      },
      {
        "username": "Jimmy McGill",
        "rating": 6
      }
      ]
    }
  ]

  courseOnAddClick(): void {
    if (!this.courseTitleInput
      || !this.courseTitleInput.trim()
      || !this.courseDescInput
      || !this.courseDescInput.trim()
      || !this.courseDateOfPublishInput
      || !this.courseDateOfPublishInput.trim()) {
      this.showError = true;

      return;
    }

    this.courses.push({
      title: this.courseTitleInput,
      description: this.courseDescInput,
      dateOfPublishing: this.courseDateOfPublishInput
    });

    this.cleanUpInputs();
  }

  courseOnRemoveClick(index: number): void {
    delete this.courses[index];
  }

  courseOnRemoveByLastClick(): void {
    this.courses.pop();
  }

  userOnAddClick(): void {
    if (!this.userNameInput
      || !this.userNameInput.trim()
      || !this.userPassInput
      || !this.userPassInput.trim()
      || !this.userFNameInput
      || !this.userFNameInput.trim()
      || !this.userLNameInput
      || !this.userLNameInput.trim()
      || !this.userEmailInput
      || !this.userEmailInput.trim()
    ) {
      this.showError = true;

      return;
    }

    this.users.push({
      username: this.userNameInput,
      password: this.userPassInput,
      fname: this.userFNameInput,
      lname: this.userLNameInput,
      email: this.userEmailInput
    });

    this.cleanUpInputs();
  }

  userOnRemoveClick(index: number): void {
    delete this.users[index];
  }

  onRemoveByLastClick() {
    this.users.pop();
  }

  getUsers(): User[]{
    return this.users;
  }

  userOnUpdateClick(index: number): void {
    this.userNameInput = this.users[index].username;
    this.userPassInput = this.users[index].password;
    this.userFNameInput = this.users[index].fname;
    this.userLNameInput = this.users[index].lname;
    this.userEmailInput = this.users[index].email;

    this.currentUpdateEntity = index;
  }

  userOnUpdateConfirmClick(): void {
    let index = this.currentUpdateEntity;

    this.users[index].username = this.userNameInput;
    this.users[index].password = this.userPassInput;
    this.users[index].fname = this.userFNameInput;
    this.users[index].lname = this.userLNameInput;
    this.users[index].email = this.userEmailInput;

    this.currentUpdateEntity = null;

    this.cleanUpInputs();
  }

  courseOnUpdateClick(index: number): void {
    this.courseTitleInput = this.courses[index].title;
    this.courseDescInput = this.courses[index].description;
    this.courseDateOfPublishInput = this.courses[index].dateOfPublishing;

    this.currentUpdateEntity = index;
  }

  courseOnUpdateConfirmClick(): void {
    let index = this.currentUpdateEntity;

    this.courses[index].title = this.courseTitleInput;
    this.courses[index].description = this.courseDescInput;
    this.courses[index].dateOfPublishing = this.courseDateOfPublishInput;

    this.currentUpdateEntity = null;

    this.cleanUpInputs();
  }

  cleanUpInputs(): void {
    this.userNameInput = null;
    this.userPassInput = null;
    this.userFNameInput = null;
    this.userLNameInput = null;
    this.userEmailInput = null;

    this.courseTitleInput = null;
    this.courseDescInput = null;
    this.courseDateOfPublishInput = null;
  }
}
