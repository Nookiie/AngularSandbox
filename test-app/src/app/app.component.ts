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
        "title":"Internet Technologies",
        "description": "This is the description",
        "dateOfPublishing":"14.04.2020",
        "ratings":[{
            "username":"Peter Thoroughbrow",
            "rating": 6
        },
        {
            "username":"George Davidson",
            "rating": 6
        },
        {
            "username":"James Goodwill",
            "rating": 6
        }   
        ]
    },
    {
        "title":"Big Data",
        "description": "Big Data Stuff",
        "dateOfPublishing":"25.02.2020",
        "ratings":[{
            "username":"Peter Thoroughbrow",
            "rating": 6
        },
        {
            "username":"George Davidson",
            "rating": 4
        },
        {
            "username":"James Goodwill",
            "rating": 6
        }   
        ]
    },
    {
        "title":"Angular Learning",
        "description": "Big Data Stuff",
        "dateOfPublishing":"16.01.2020",
        "ratings":[{
            "username":"Peter Thoroughbrow",
            "rating": 2
        },
        {
            "username":"George Davidson",
            "rating": 6
        },
        {
            "username":"Jimmy McGill",
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

    this.courseTitleInput = null;
    this.courseDescInput = null;
    this.courseDateOfPublishInput = null;
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

    this.userNameInput = null;
    this.userPassInput = null;
    this.userFNameInput = null;
    this.userLNameInput = null;
    this.userEmailInput = null;
  }

  userOnRemoveClick(index: number): void {
    delete this.users[index];
  }

  onRemoveByLastClick() {
    this.users.pop();
  }

  onUpdateClick(): void {

  }


  moreStuff(): void {

  }
}
