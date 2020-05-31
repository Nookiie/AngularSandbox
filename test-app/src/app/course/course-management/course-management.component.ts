import { Component, OnInit } from '@angular/core';
import { Course } from 'src/assets/model/course';

//Experimental proof-of-concept Management Interface
//Not used by application
@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss']
})
export class CourseManagementComponent implements OnInit {

  constructor() { }

  showError: boolean;

  courseTitleInput: string;
  courseDescInput: string;
  courseDateOfPublishInput: string;
  currentUpdateEntity: number;

  courses: Course[] = [
    {
      "title": "Internet Technologies",
      "description": "This is the description",
      "dateOfPublish": "2020-04-19",
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
      "dateOfPublish": "2020-04-16",
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
      "dateOfPublish": "2020-03-15",
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
      dateOfPublish: this.courseDateOfPublishInput
    });

    this.courseTitleInput = null;
    this.courseDescInput = null;
    this.courseDateOfPublishInput = null;
  }

  courseOnUpdateClick(index: number): void {
    this.courseTitleInput = this.courses[index].title;
    this.courseDescInput = this.courses[index].description;
    this.courseDateOfPublishInput = this.courses[index].dateOfPublish;

    this.currentUpdateEntity = index;
  }

  courseOnUpdateConfirmClick(): void {
    let index = this.currentUpdateEntity;

    this.courses[index].title = this.courseTitleInput;
    this.courses[index].description = this.courseDescInput;
    this.courses[index].dateOfPublish = this.courseDateOfPublishInput;

    this.currentUpdateEntity = null;

    this.cleanUpInputs();
  }

  cleanUpInputs(): void{
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


  ngOnInit(): void {

  }

}
