import { Component, OnInit, OnDestroy, Inject, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/assets/model/user';
import { Course } from 'src/assets/model/course';
import { UserService } from 'src/assets/services/users.service';
import { JsonGetService } from 'src/assets/services/json.get.service';
import { CoursesService } from 'src/assets/services/courses.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CourseUtils } from 'src/assets/utils/courseUtils';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})

export class AccountInfoComponent implements OnInit, OnDestroy {
  @Input() user: User;

  @Output() userSelected = new EventEmitter<string>();
  @Output() userDeleted = new EventEmitter<number>();

  selectedUserUsername: string;

  destroy$ = new Subject<boolean>();

  formGroup: FormGroup;
  showErrorCanNotVoteTwice: boolean;
  currentCourseEntity: number;
  defaultRatings: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  users: User[]
  courses: Course[];

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private courseService: CoursesService) {
    this.formGroup = this.fb.group({

    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("currentUser"));

    this.getCourses()
    let userCourses = this.courses.find(x =>
      x.ratings.find(x => x.username === this.user.username))

    this.user.favouriteCourses.push(userCourses);
    this.userService.saveUser(this.user)

    localStorage.setItem("currentUser", JSON.stringify(this.user));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getPersonalRating(course: Course): string {
    let rating: string;

    try {
      rating = course.ratings.find(x => x.username == this.user.username)
        ? course.ratings.find(x => x.username === this.user.username).rating.toString()
        : "No Rating Given";
    }
    catch{
      return "No Rating Given";
    }

    return rating;
  }

  unfavourite(course: Course) {
    this.user.favouriteCourses = this.user.favouriteCourses.filter(x => x !== course);

    localStorage.setItem("currentUser", JSON.stringify(this.user));
    this.userService.saveUser(this.user).subscribe();
  }

  private getCourses(searchValue?: string): void {
    this.courseService.getCourses(searchValue).pipe()
      .subscribe(response => {
        this.courses = response;
      }, error => {
        console.log(error);
      });
  }

}
