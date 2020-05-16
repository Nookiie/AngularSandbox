import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/assets/model/user';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/assets/services/users.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})

export class RegisterFormComponent implements OnInit {
  
  formGroup: FormGroup;
  user: User;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {
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
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    const user = this.formGroup.value;

    console.log(user);

    this.userService.saveUser(user).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() =>
      this.router.navigate(['/user-list']));
  }

  private buildForm(): void {
    if (!this.user) {
      this.user = {
        username: '',
        password: '',
        fname: '',
        lname: '',
        email: ''
      }
    }
    this.formGroup = this.fb.group({
      id: [this.user.id],
      username: [this.user.username, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: [this.user.password, [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      fname: [this.user.fname, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lname: [this.user.lname, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }
}
