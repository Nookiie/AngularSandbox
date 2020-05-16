import { Component, OnInit } from '@angular/core';
import { User } from 'src/assets/model/user';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/assets/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private userService: UserService) {
      this.user = {
        username:'',
        password:'',
        lname:'',
        fname:'',
        email:''
      };

    this.formGroup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(32)]]
    });
  }

  showError: boolean;
  currentLoggedInUser: User;

  users: User[];
  user: User;

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.login(this.formGroup.value.username, this.formGroup.value.password)
    }
  }

  authenticate(username: string, password: string): boolean {
    this.setUser(username, password)

    let user = this.users.find(x => x.username === username
      && x.password === password)

    if (user) {
      console.log("Welcome, " + this.user.username);

      this.setUser(username, password);
      
      return false;
    }

    console.log("Access Denied");
    return false;
  }

  private setUser(username: string, password: string): void {
    this.user = this.users.find(x => x.username === username)
  }

  login(username: string, password: string): void {
    if(this.authenticate(username, password)){

    }
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(searchValue?: string): void {
    this.userService.getUsers(searchValue).pipe()
      .subscribe(response => {
        this.users = response;
      }, error => {
        console.log(error);
      });
  }
}
