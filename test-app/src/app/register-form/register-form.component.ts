import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/assets/model/user';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  formGroup: FormGroup;
  userManagement: AppComponent;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(32)]],
      fname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email]]
    });
  }

  users: User[];
  onSubmit(): void {
    if (this.formGroup.valid)
    {
      console.log(this.formGroup);
    }
  }
  ngOnInit(): void {
   this.users = this.userManagement.getUsers(); 
  }

}
