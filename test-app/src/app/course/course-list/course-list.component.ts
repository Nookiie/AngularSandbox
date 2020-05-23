import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/assets/model/course';
import { User } from 'src/assets/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseUtils } from 'src/assets/utils/courseUtils';
import { CoursesService } from 'src/assets/services/courses.service';
import { Subject, timer } from 'rxjs';
import { stringify } from 'querystring';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/assets/services/users.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, OnDestroy {
  selectedCourse: Course;

  destroy$ = new Subject<boolean>();
  selectedRating: number;
  isCurrentUserAdmin: boolean;

  formGroup: FormGroup;

  courseUtils: CourseUtils = new CourseUtils();

  showErrorCanNotVoteTwice: boolean;
  currentCourseEntity: number;
  defaultRatings: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  users: User[]
  courses: Course[];

  debugRateMessage: string;

  constructor(private fb: FormBuilder,
    private courseService: CoursesService,
    private userService: UserService) {
    this.formGroup = this.fb.group({
      rating: [0, [Validators.required, Validators.max(10), Validators.min(0)]],
    });
  }

  // New Section
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      search: ['']
    });
    let user = JSON.parse(localStorage.getItem("currentUser"));
    this.isCurrentUserAdmin = user.isAdmin;

    this.getCourses();
  }

  onCourseSelected(course: Course): void {
    this.selectedCourse = course;
  }

  onCourseFavourited(course: Course): void {
    let user = JSON.parse(localStorage.getItem("currentUser"));

    if (course != null) {
      user.favouriteCourses.push(course);
    }

    this.userService.saveUser(user).subscribe(() => {
      this.getUsers();
    });

    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  onCourseUnfavourited(course: Course): void {
    let user: User = JSON.parse(localStorage.getItem("currentUser"));
    let newCourses: Course[] = user.favouriteCourses.filter(x => x.title !== course.title);

    user.favouriteCourses = newCourses;
    this.userService.saveUser(user).subscribe(() => {
      this.getUsers();
    })

    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  isCourseFavourite(course: Course): boolean {
    let user: User;
    user = JSON.parse(localStorage.getItem("currentUser"));

    if (user.favouriteCourses.find(x => x.title === course.title) != null) {
      return true;
    }

    return false;
  }


  onCourseRated(course: Course): void {
    this.selectedCourse = course;
  }

  onSearch(): void {
    const searchValue = this.formGroup.controls.search.value;

    this.getCourses(searchValue);
  }

  onClearSearch(): void {
    this.formGroup.get('search').setValue(null);
    this.selectedCourse = null;
    this.debugRateMessage = null;

    this.getCourses();
  }

  onDelete(id: number): void {
    this.courseService.deleteCourse(id).pipe(
    ).subscribe(() => {
      this.getCourses();
    });
  }

  onRateClick(): void {
    this.getCourse();
    let user = JSON.parse(localStorage.getItem("currentUser"));

    let course = this.selectedCourse.ratings.find(x => x.username == user.username);
    if (!course) {
      this.selectedCourse.ratings.push({
        username: user.username,
        rating: this.selectedRating
      });
      this.courseService.saveCourse(this.selectedCourse).subscribe();
      this.debugRateMessage = "Successfully rated "
        + this.selectedCourse.title
        + " with a rating of " + this.selectedRating;

    }
    else {
      this.selectedCourse.ratings = this.selectedCourse.ratings.filter(x => x.username !== user.username);

      this.selectedCourse.ratings.push({
        username: user.username,
        rating: this.selectedRating
      });

      this.courseService.saveCourse(this.selectedCourse).subscribe();
      this.debugRateMessage = "Successfully updated "
        + this.selectedCourse.title
        + " with a rating of " + this.selectedRating;
    }
  }

  getRating(rating: number) {
    console.log(rating);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getCourses(searchValue?: string): void {
    this.courseService.getCourses(searchValue).pipe()
      .subscribe(response => {
        this.courses = response;
      }, error => {
        console.log(error);
      });
  }

  private getUsers(searchValue?: string): void {
    this.userService.getUsers(searchValue).pipe()
      .subscribe(response => {
        this.users = response;
      }, error => {
        console.log(error);
      });
  }

  private getCourse(searchValue?: string): void {
    this.courseService.getCourseById(this.selectedCourse.id).pipe()
      .subscribe(response => {
        this.selectedCourse = response;
      }, error => {
        console.log(error);
      });
  }

}
