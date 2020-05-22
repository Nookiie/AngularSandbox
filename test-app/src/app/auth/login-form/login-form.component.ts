import { Component, OnInit } from '@angular/core';
import { User } from 'src/assets/model/user';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/assets/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { IndexComponent } from 'src/app/index/index.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: [''],
    });
  }

  showError: boolean;

  users: User[];
  user: User;

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.login(this.formGroup.value.username, this.formGroup.value.password)
    }
  }

  checkPassword(): boolean {
    if (this.formGroup.get('password') === this.formGroup.get('confirmPassword')) {
      return true;
    }

    return false;
  }

  authenticate(email: string, password: string): User {
    if (!this.checkPassword()) {
      return;
    }

    let user = this.users.find(x => x.email === email
      && x.password === password)

    return user;
  }

  private setUser(user: User): void {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  login(username: string, password: string): void {
    let user = this.authenticate(username, password)
    if (user) {
      this.setUser(user);

      console.log("Welcome " + user.username);

      this.router.navigate(["/index"]);
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
