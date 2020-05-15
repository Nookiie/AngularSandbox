import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/assets/model/course';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss']
})
export class CourseListItemComponent implements OnInit {


  @Input() course: Course;

  @Output() courseSelected = new EventEmitter<string>();
  @Output() courseDeleted = new EventEmitter<number>();

  constructor() {
    this.course = {
      title: '',
      description: '',
      dateOfPublishing:'' 
    };
   }

   getDescription(): string {
    if (this.course.description.length > 100) {
      return `${this.course.description.substr(0, 100)}...`;
    }

    return this.course.description
  }

  onSelectClick(): void {
    this.courseSelected.emit(this.course.title);
  }

  onDeleteClick(): void {
    this.courseDeleted.emit(this.course.id);
  }

  ngOnInit(): void {
    
  }

}
