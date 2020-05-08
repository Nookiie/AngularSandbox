import { Component, OnInit } from '@angular/core';
import { User } from 'src/assets/model/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor() { }
  showError: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
  currentUpdateEntity: number;

  userNameInput: string;
  userPassInput: string;
  userFNameInput: string;
  userLNameInput: string;
  userEmailInput: string;

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
  userOnAddClick(): void {
    if (!this.userNameInput
      || !this.userNameInput.trim()
      || !this.userPassInput
      || !this.userPassInput.trim()
      || !this.userFNameInput
      || !this.userFNameInput.trim()
      || !this.userLNameInput
      || !this.userLNameInput.trim()
      || !this.userEmailInput
      || !this.userEmailInput.trim()
    ) {
      this.showError = true;

      return;
    }

    this.users.push({
      username: this.userNameInput,
      password: this.userPassInput,
      fname: this.userFNameInput,
      lname: this.userLNameInput,
      email: this.userEmailInput
    });

    this.userNameInput = null;
    this.userPassInput = null;
    this.userFNameInput = null;
    this.userLNameInput = null;
    this.userEmailInput = null;
  }

  userOnUpdateClick(index: number): void {
    this.userNameInput = this.users[index].username;
    this.userPassInput = this.users[index].password;
    this.userFNameInput = this.users[index].fname;
    this.userLNameInput = this.users[index].lname;
    this.userEmailInput = this.users[index].email;

    this.currentUpdateEntity = index;
  }

  userOnUpdateConfirmClick(): void {
    let index = this.currentUpdateEntity;

    this.users[index].username = this.userNameInput;
    this.users[index].password = this.userPassInput;
    this.users[index].fname = this.userFNameInput;
    this.users[index].lname = this.userLNameInput;
    this.users[index].email = this.userEmailInput;

    this.currentUpdateEntity = null;

    this.cleanUpInputs();
  }

  cleanUpInputs(): void{
    this.userEmailInput = null;
    this.userNameInput = null;
    this.userPassInput = null;
    this.userFNameInput = null;
    this.userLNameInput = null;
  }


  userOnRemoveClick(index: number): void {
    delete this.users[index];
  }

  onRemoveByLastClick() {
    this.users.pop();
  }


  ngOnInit(): void {
  }

}
