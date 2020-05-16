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
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})

export class AccountEditComponent implements OnInit {
  @Input() user: User;

  @Output() userSelected = new EventEmitter<string>();
  @Output() userDeleted = new EventEmitter<number>();

  selectedUserUsername: string;

  destroy$ = new Subject<boolean>();

  formGroup: FormGroup;
  courseUtils: CourseUtils = new CourseUtils();
  showErrorCanNotVoteTwice: boolean;
  currentCourseEntity: number;
  defaultRatings: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  users: User[]
  courses: Course[];

  constructor(private fb: FormBuilder,
    private userService: UserService, ) {
    this.formGroup = this.fb.group({

    });
  }

  ngOnInit(): void {
    this.user = {
      username: '',
      password: '',
      fname: '',
      lname: '',
      email: ''
    }

    this.getUsers();
    this.getUser(2);
  }

  onUserSelected(username: string): void {
    this.selectedUserUsername = username;
  }

  onSearch(): void {
    const searchValue = this.formGroup.controls.search.value;

    this.getUsers(searchValue);
  }

  onClearSearch(): void {
    this.formGroup.get('search').setValue(null);

    this.getUsers();
  }

  onDelete(id: number): void {
    this.userService.deleteUser(id).pipe(
    ).subscribe(() => {
      this.getUsers();
    });
  }

  private getUsers(searchValue?: string): void {
    this.userService.getUsers(searchValue).pipe()
      .subscribe(response => {
        this.users = response;
      });
  }

  private getUser(id: number): void {
    this.userService.getUserById(id).pipe()
      .subscribe(response => {
        this.user = response;
      }, error => {
        console.log(error);
      })
  }

  onDeleteClick(id: number): void {
    this.userService.deleteUser(id).pipe()
      .subscribe(() => this.getUsers());
  }

  onBlockClick(id: number): void {
    let user = this.users[id];
    this.userService.blockUser(user);

    console.log(user);
  }

  getPersonalRating(course: Course): string {
    let rating;
    try {
      rating = course.ratings.find(x =>
        x.username === this.user.username).rating
    }
    catch{
      return "No Rating Given";
    }

    if (rating === null) {
      return "No Rating Given";
    }

    return rating.toString();
  }

  unfavourite(course: Course) {
    let courseIndex = this.user.favouriteCourses.indexOf(course);

    delete this.user.favouriteCourses[courseIndex];
  }
  onSubmit(): void {

  }
}
