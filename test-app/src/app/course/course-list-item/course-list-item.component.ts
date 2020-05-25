import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Course } from 'src/assets/model/course';
import { CoursesService } from 'src/assets/services/courses.service';
import { CourseRating } from 'src/assets/model/courseRating';
import { User } from 'src/assets/model/user';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss']
})
export class CourseListItemComponent implements OnInit, OnChanges {

  @Input() course: Course;

  @Output() courseSelected = new EventEmitter<Course>();
  @Output() courseFavourited = new EventEmitter<Course>();
  @Output() courseUnfavourited = new EventEmitter<Course>();
  @Output() courseRated = new EventEmitter<Course>();
  @Output() courseDeleted = new EventEmitter<number>();

  isCurrentUserAdmin: boolean;

  constructor() {

  }

  getDescription(): string {
    if (this.course.description.length > 100) {
      return `${this.course.description.substr(0, 100)}...`;
    }

    return this.course.description
  }

  isCourseFavourite(course: Course): boolean {
    let user: User;
    user = JSON.parse(localStorage.getItem("currentUser"));

    if (user.favouriteCourses.find(x => x.title === course.title) != null) {
      return true;
    }

    return false;
  }


  getAverageRating(): string {
    let sum = 0;

    this.course.ratings.forEach(x => {
      sum += x.rating;
    });

    if (sum === 0) {
      return "No Ratings"
    }

    return (sum / this.course.ratings.length).toPrecision(2);
  }

  getUserRating(): string {
    let user = JSON.parse(localStorage.getItem("currentUser"));

    let userCourseRating = this.course.ratings.filter(x => x.username === user.username);

    try {
      if (userCourseRating) {
        return userCourseRating[0].rating.toString();
      }
    }
    catch{
      return "Not Rated Yet";
    }

    return "Not Rated Yet";
  }

  onSelectClick(): void {
    this.courseSelected.emit(this.course);
  }

  onFavouriteClick(): void {
    this.courseFavourited.emit(this.course);
  }

  onUnfavouriteClick(): void {
    this.courseUnfavourited.emit(this.course);
  }

  onDeleteClick(): void {
    this.courseDeleted.emit(this.course.id);
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    this.isCurrentUserAdmin = user.isAdmin;
  }

  ngOnChanges(): void {

  }
}
