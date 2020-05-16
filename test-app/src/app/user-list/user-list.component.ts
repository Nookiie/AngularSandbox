import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/assets/model/user';
import { AppComponent } from '../app.component';
import { CourseUtils } from 'src/assets/utils/courseUtils';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/assets/services/users.service';
import { Course } from 'src/assets/model/course';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
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
    private userService: UserService) {
    this.formGroup = this.fb.group({

    });
    this.user = {
      username: '',
      password: '',
      fname: '',
      lname: '',
      email: '',
    }
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      search: ['']
    });

    this.getUsers();
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getUsers(searchValue?: string): void {
    this.userService.getUsers(searchValue).pipe()
      .subscribe(response => {
        this.users = response;
      }, error => {
        console.log(error);
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
}
