import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/assets/model/course';
import { User } from 'src/assets/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseUtils } from 'src/assets/utils/courseUtils';
import { CoursesService } from 'src/assets/services/courses.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, OnDestroy {

  course: Course[];
  selectedCourseTitle: string;

  destroy$ = new Subject<boolean>();

  formGroup: FormGroup;

  courseUtils: CourseUtils = new CourseUtils();

  showErrorCanNotVoteTwice: boolean;
  currentCourseEntity: number;
  defaultRatings: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  users: User[]
  courses: Course[];

  constructor(private fb: FormBuilder,
    private courseService: CoursesService) {
    this.formGroup = this.fb.group({
      rating: [0, [Validators.required, Validators.max(10), Validators.min(0)]],
    });
  }
  
  // New Section
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      search: ['']
    });

    this.getCourses();
  }

  onCourseSelected(title: string): void {
    this.selectedCourseTitle = title;
  }

  onSearch(): void {
    const searchValue = this.formGroup.controls.search.value;

    this.getCourses(searchValue);
  }

  onClearSearch(): void {
    this.formGroup.get('search').setValue(null);

    this.getCourses();
  }
  
  onDelete(id: number): void {
    this.courseService.deleteCourse(id).pipe(
    ).subscribe(() => {
      this.getCourses();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getCourses(searchValue?: string): void {
    this.courseService.getCourses(searchValue).pipe()
      .subscribe(response => {
        this.courses = response;
      }, error => {
        console.log(error);
      });
  }
}
