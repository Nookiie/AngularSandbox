import { Component, OnInit } from '@angular/core';
import { User } from 'src/assets/model/user';
import { AppComponent } from '../app.component';
import { CourseUtils } from 'src/assets/utils/courseUtils';

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.scss']
})
export class UserAdministrationComponent implements OnInit {

  showError: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
  currentUpdateEntity: number;
  courseUtils: CourseUtils = new CourseUtils();

  users: User[] = [
    {
      "username": "maman59",
      "password": "maman98",
      "fname": "David",
      "lname": "Peterbough",
      "email": "maman@gmail.com"
    },
    {
      "username": "maman68",
      "password": "maman68",
      "fname": "Viktor",
      "lname": "Gill",
      "email": "davar@gmail.com"
    },
    {
      "username": "some_stupid_username",
      "password": "some_stupid_password",
      "fname": "George",
      "lname": "Smith",
      "email": "george.smith@gmail.com"
    }
  ];

  userOnRemoveClick(index: number): void {
    delete this.users[index];
  }

  userOnBlockClick(index: number): void {
    if (this.users[index].isBlocked == null || this.users[index].isBlocked === false) {
      this.users[index].isBlocked = true;

      console.log("Blocked user: " + this.users[index].username);

    }
    else {
      this.users[index].isBlocked = false;

      console.log("Unblocked user: " + this.users[index].username);
    }
  }
  ngOnInit(): void {

  }

}
