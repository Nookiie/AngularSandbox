import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/assets/model/course';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/assets/services/courses.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  formGroup: FormGroup;
  course: Course;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private moviesService: CoursesService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      if (params.id) {
        this.moviesService.getCourseById(params.id).pipe(
          takeUntil(this.destroy$)
        ).subscribe(response => {
          this.course = response;

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
    const course = this.formGroup.value;

    console.log(course);

    this.moviesService.saveCourse(course).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() =>
      this.router.navigate(['/course-list']));
  }

  private buildForm(): void {
    if (!this.course) {
      this.course = {
        title: '',
        description: '',
        dateOfPublishing: ''
      }
    }
    this.formGroup = this.fb.group({
      id: [this.course.id],
      title: [this.course.title, [Validators.required, Validators.minLength(5)]],
      description: [this.course.description],
      dateOfPublish: [this.course.dateOfPublishing, [Validators.required]]
    });
  }
}
