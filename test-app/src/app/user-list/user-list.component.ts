import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/assets/model/user';
import { AppComponent } from '../app.component';
import { CourseUtils } from 'src/assets/utils/courseUtils';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/assets/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  showError: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
  currentUpdateEntity: number;
  courseUtils: CourseUtils = new CourseUtils();

  formGroup: FormGroup;

  users: User[];

  constructor(private userService: UserService, private fb: FormBuilder){

  }

  userOnRemoveClick(index: number): void {
    delete this.users[index];
  }

  userOnBlockClick(index: number): void {
    if (this.users[index].isBlocked == null || this.users[index].isBlocked === false) {
      this.users[index].isBlocked = true;

      console.log("Blocked user: " + this.users[index].username);

    }
    else {
      this.users[index].isBlocked = false;

      console.log("Unblocked user: " + this.users[index].username);
    }
  }
ngOnInit(): void {
    // this.getMovies();

    // this.formGroup = this.fb.group({
    //   search: ['']
    };
  

//   ngOnDestroy(): void {
//     this.destroy$.next(true);
//     this.destroy$.unsubscribe();
//   }

//   onMovieSelected(title: string): void {
//     this.selectedMovieTitle = title;
//   }

//   onSearch(): void {
//     // get title from form
//     const searchValue = this.formGroup.controls.search.value;

//     this.getMovies(searchValue);
//   }

//   onClearSearch(): void {
//     this.formGroup.get('search').setValue(null);

//     this.getMovies();
//   }

//   onDelete(id: number): void {
//     this.moviesService.deleteMovie(id).pipe(
//       takeUntil(this.destroy$)
//     ).subscribe(() => {
//       this.getMovies();
//     });
//   }

//   private getMovies(searchValue?: string): void {
//     this.moviesService.getMovies(searchValue).pipe(
//       // map(response => response.filter(x => x.rating > 7)),
//       takeUntil(this.destroy$)
//     ).subscribe(response => {
//       this.movies = response;
//     }, error => {
//       console.log(error);
//     });
// }
  }
