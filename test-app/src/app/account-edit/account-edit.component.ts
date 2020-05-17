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
  formGroup: FormGroup;
  user: User;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      if (params.id) {
        this.userService.getUserById(params.id).pipe(
          takeUntil(this.destroy$)
        ).subscribe(response => {
          this.user = response;

          this.buildForm();
        });
      }
    });

    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    const user = this.formGroup.value;

    console.log(user);

    this.userService.saveUser(user).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() =>
      this.router.navigate(['/account-info']));
  }

  private buildForm(): void {
    if (!this.user) {
      this.user = {
        username: '',
        password: '',
        fname: '',
        lname: '',
        email: '',
        isBlocked:false,
        isAdmin:false,
        favouriteCourses:[]
      }
    }
    this.formGroup = this.fb.group({
      id: [this.user.id],
      username: [this.user.username, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: [this.user.password, [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      fname: [this.user.fname, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lname: [this.user.lname, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      favouriteCourses:[this.user.favouriteCourses]
    });
  }
}
