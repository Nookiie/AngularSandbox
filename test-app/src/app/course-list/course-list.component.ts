import { Component, OnInit } from '@angular/core';
import { Course } from 'src/assets/model/course';
import { User } from 'src/assets/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      rating: [0, [Validators.required, Validators.max(10), Validators.min(0)]],
    });
  }

  showErrorCanNotVoteTwice: boolean;
  currentCourseEntity: number;
  courseStuff: number;
  defaultRatings: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  users: User[] = [
    {
      "username": "maman59",
      "password": "maman98",
      "fname": "David",
      "lname": "Peterbough",
      "email": "maman@gmail.com",
      "isAdmin": false,
      "isBlocked": false
    },
    {
      "username": "maman68",
      "password": "maman68",
      "fname": "Viktor",
      "lname": "Gill",
      "email": "davar@gmail.com",
      "isAdmin": true,
      "isBlocked": false
    },
    {
      "username": "some_stupid_username",
      "password": "some_stupid_password",
      "fname": "George",
      "lname": "Smith",
      "email": "george.smith@gmail.com",
      "isAdmin": false,
      "isBlocked": false
    }
  ];
  currentLoggedInUser: User = this.users[1];

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

  courseVoteSelect(index: number) {
    this.currentCourseEntity = index;
    if(this.courses[this.currentCourseEntity].ratings.find(x => x.username === this.currentLoggedInUser.username)){
      this.showErrorCanNotVoteTwice = true;
      this.currentCourseEntity = null;

      return;
    }

    this.showErrorCanNotVoteTwice = false;
  }

  courseVoteConfirm(rating: number) {
    this.courses[this.currentCourseEntity].ratings.push({
      username: this.currentLoggedInUser.username,
      rating: rating
    })

    console.log("User: " + this.currentLoggedInUser.username +
      " has given course: " + this.courses[this.currentCourseEntity].title + " a rating of: " + rating);

    this.currentCourseEntity = null;
  }

  courseFavourite(index: number) {
    this.currentLoggedInUser.favouriteCourses.push(this.courses[index]);

    console.log("User: " + this.currentLoggedInUser.username + " has favourited a course: " + this.courses[index]);
  }

  onSubmitVote(): void {
    if (this.formGroup.valid) {
      this.courseVoteConfirm(this.formGroup.value.rating);
    }
  }

  ngOnInit(): void {

  }
}