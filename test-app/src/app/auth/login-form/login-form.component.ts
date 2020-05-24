import { Component, OnInit } from '@angular/core';
import { User } from 'src/assets/model/user';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/assets/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  formGroup: FormGroup;
  loginErrorMessage: string;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthenticationService) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  showError: boolean;

  destroy$ = new Subject<boolean>();

  users: User[];
  user: User;

  onSubmit(): void {
    this.loginErrorMessage = null;

    if (this.formGroup.valid) {
      this.login(this.formGroup.value.email, this.formGroup.value.password)
    }
  }

  authenticate(email: string, password: string): User {
    this.authService.login(email, password).pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
      if (!response) {
        this.loginErrorMessage = 'Invalid email or password.';

        return null;
      }

      if (response.isBlocked) {
        this.loginErrorMessage = "This account is disabled";

        return null;
      }

      this.user = response;
    });
    return this.user;
  }

  login(email: string, password: string): void {
    let user = this.authenticate(email, password)
    if (user) {
      this.authService.setLoggedUser(user);
      console.log(user);
      
      this.router.navigate(['index']);
    }
  }

  ngOnInit(): void {
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
}
