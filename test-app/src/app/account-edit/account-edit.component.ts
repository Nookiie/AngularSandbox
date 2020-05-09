import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/assets/model/user';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})

export class AccountEditComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      username: [this.currentLoggedInUser.username, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      password: [this.currentLoggedInUser.password, [Validators.required, Validators.minLength(5), Validators.maxLength(32)]],
      fname: [this.currentLoggedInUser.fname, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lname: [this.currentLoggedInUser.lname, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    });
  }
  showError: boolean;
  isAdmin: boolean;
  
  users: User[] = [
    {
        "username": "maman59",
        "password": "maman98",
        "fname": "David",
        "lname": "Peterbough",
        "email":"maman@gmail.com",
        "isAdmin":false,
        "isBlocked":false
    },
    {
        "username": "maman68",
        "password": "maman68",
        "fname": "Viktor",
        "lname": "Gill",
        "email": "davar@gmail.com",
        "isAdmin":true,
        "isBlocked":false
    },
    {
        "username": "some_stupid_username",
        "password": "some_stupid_password",
        "fname": "George",
        "lname": "Smith",
        "email":"george.smith@gmail.com",
        "isAdmin":false,
        "isBlocked":false
    }
];

  currentLoggedInUser = this.users[1];
  async onSubmit() {
    let index = this.users.indexOf(this.users.find(x => x.username === this.currentLoggedInUser.username))

    this.currentLoggedInUser.username = this.formGroup.value.username;
    this.currentLoggedInUser.password = this.formGroup.value.password;
    this.currentLoggedInUser.fname = this.formGroup.value.fname;
    this.currentLoggedInUser.lname = this.formGroup.value.lname;

    if (index === -1) {
      console.log("Could not find user");
      return;
    }
    this.users[index] = this.currentLoggedInUser;
    console.log("User: " + this.currentLoggedInUser.username + " has successfully changed his account info");

    this.users.forEach(x => {
      console.log(x);
    });
  }

  ngOnInit(): void {

  }

}
