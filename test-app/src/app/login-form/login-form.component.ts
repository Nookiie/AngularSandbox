import { Component, OnInit } from '@angular/core';
import { User } from 'src/assets/model/user';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(32)]]
    });
  }

  showError: boolean;
  currentLoggedInUser: User;
  isAdmin: boolean;

  userNameInput: string;
  userPassInput: string;

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

  onSubmit(): void {
    if (this.formGroup.valid){
      this.authenticate(this.formGroup.value.username, this.formGroup.value.password)
    }
  }

  authenticate(username: string, password: string): boolean {
    let user = this.users.find(x => x.username === username 
      && x.password === password);

    if (user != null) {
      this.currentLoggedInUser = user;
      console.log("User: " + user.username + " has logged in");

      return true;
    }

    console.log("Access Denied");
    return false;
  }

  ngOnInit(): void {
    
  }

}
