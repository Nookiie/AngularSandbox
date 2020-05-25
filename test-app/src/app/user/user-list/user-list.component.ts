import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/assets/model/user';
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
      id:1,
      username: '',
      password: '',
      fname: '',
      lname: '',
      email: '',
      isBlocked: false,
      isAdmin: false,
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

  onDeleteClick(id: number): void {
    this.user = this.users[id];

    if(this.user.isAdmin){
      console.log("Can not delete an admin user!");
      return;
    }

    this.userService.deleteUser(id).pipe()
      .subscribe(() => this.getUsers());
  }

  onBlockClick(id: number): void {
    this.user = this.users[id];

    if(this.user.isAdmin){
      console.log("Can not block an admin user!");
      return;
    }

    this.user.isBlocked = !this.user.isBlocked;
    this.userService.saveUser(this.user).subscribe();
  }
}
