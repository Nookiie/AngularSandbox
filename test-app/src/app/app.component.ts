import { Component } from '@angular/core';
import { User } from '../assets/model/user';
import { Course } from '../assets/model/course';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { CourseRating } from '../assets/model/courseRating';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';

import { UserManagement } from 'src/assets/logic/userManagement';
import { CourseManagement } from 'src/assets/logic/courseManagement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'test-app';

}
