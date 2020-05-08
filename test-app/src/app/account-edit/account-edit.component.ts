import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/assets/model/user';
import * as usersJson from 'src/assets/storage/users.json';

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
  users: User[] = usersJson;

  currentLoggedInUser: User = this.users[1];
  onSubmit(): void {
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
