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

  selectedUserUsername: string;

  destroy$ = new Subject<boolean>();

  formGroup: FormGroup;
  showErrorCanNotVoteTwice: boolean;
  currentCourseEntity: number;
  defaultRatings: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  users: User[]
  courses: Course[];

  constructor(private fb: FormBuilder,
    private userService: UserService) {
    this.formGroup = this.fb.group({

    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("currentUser"));

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
  unfavourite(course: Course) {
    this.user.favouriteCourses = this.user.favouriteCourses.filter(x => x !== course);

    localStorage.setItem("currentUser", JSON.stringify(this.user));
    this.userService.saveUser(this.user).subscribe();
  }
}
