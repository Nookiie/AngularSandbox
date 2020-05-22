import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Course } from 'src/assets/model/course';
import { CoursesService } from 'src/assets/services/courses.service';
import { CourseRating } from 'src/assets/model/courseRating';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss']
})
export class CourseListItemComponent implements OnInit, OnChanges {

  @Input() course: Course;

  @Output() courseSelected = new EventEmitter<Course>();
  @Output() courseRated = new EventEmitter<Course>();
  @Output() courseDeleted = new EventEmitter<number>();

  constructor() {

   }

   getDescription(): string {
    if (this.course.description.length > 100) {
      return `${this.course.description.substr(0, 100)}...`;
    }

    return this.course.description
  }
  
  getAverageRating (): string{
    let sum = 0;

    this.course.ratings.forEach(x => {
       sum += x.rating;
    });

    if(sum === 0){
      return "No Ratings"
    }
   
    return (sum / this.course.ratings.length).toPrecision(2);
}

  onSelectClick(): void {
    this.courseSelected.emit(this.course);
  }

  onDeleteClick(): void {
    this.courseDeleted.emit(this.course.id);
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void{
    
  }
}
