import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/assets/model/user';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/assets/services/users.service';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})

export class RegisterFormComponent implements OnInit {

  formGroup: FormGroup;
  registerErrorMessage: string;
  user: User;
  users: User[];

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      if (params.id) {
        this.userService.getUserById(params.id).pipe(
          takeUntil(this.destroy$)
        ).subscribe(response => {
          this.user = response;

          this.buildForm();
        });
      }
    });

    this.buildForm();
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  checkPassword(): boolean {
    if (this.formGroup.value.password === this.formGroup.value.confirmPassword) {
      return true;
    }
    return false;
  }


  isEmailDuplicate(): boolean {
    if (this.users.find(x => x.email === this.formGroup.value.email)) {
      return true;
    }

    return false;
  }

  isPasswordFormsSame(): boolean {
    if (this.formGroup.value.password === this.formGroup.value.confirmPassword) {
      return true;
    }

    return false;
  }

  onSubmit(): void {
    if (this.isEmailDuplicate()) {
      this.registerErrorMessage = "There is already a user with the same email!";
      return;
    }

    if (!this.isPasswordFormsSame()) {
      this.registerErrorMessage = "Passwords are not the same!";
      return;
    }

    this.registerErrorMessage = null;

    this.formGroup.removeControl("confirmPassword");

    this.authService.register(this.formGroup.value).pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.router.navigate(['login-form']);
    });

    this.user = this.formGroup.value;
    localStorage.setItem("currentUser", JSON.stringify(this.formGroup.value));
  }

  private buildForm(): void {
    this.user = {
      username: '',
      password: '',
      fname: '',
      lname: '',
      email: '',
      isAdmin: false,
      isBlocked: false,
      favouriteCourses: []
    }

    this.formGroup = this.fb.group({
      id: [this.user.id],
      username: [this.user.username, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: [this.user.password, [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      confirmPassword: [this.user.password, [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      fname: [this.user.fname, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lname: [this.user.lname, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      isAdmin: [this.user.isAdmin],
      isBlocked: [this.user.isBlocked],
      favouriteCourses: [this.user.favouriteCourses]
    });
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
