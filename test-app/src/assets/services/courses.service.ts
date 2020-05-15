import { HttpClient, HttpParams } from '@angular/common/http';
import { Course } from '../model/Course';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class CoursesService {
    readonly url = "http://localhost:3000/courses";

    constructor(private http: HttpClient) {

    }
    getCourses(searchValue?: string): Observable<Course[]> {
        if (searchValue) {
            let params = new HttpParams();
            params = params.append('title', searchValue);

            return this.http.get<Course[]>(this.url, {
                params
            });
        }

        return this.http.get<Course[]>(this.url);
    }

    getCourseById(id: number): Observable<Course> {
        return this.http.get<Course>(`${this.url}/${id}`);
    }

    saveCourse(course: Course): Observable<Course> {
        if (course.id) {
            return this.updateCourse(course);
        } else {
            return this.addCourse(course);
        }
    }

    deleteCourse(id: number): Observable<Course> {
        return this.http.delete<Course>(`${this.url}/${id}`);
    }

    private addCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(this.url, course);
    }

    private updateCourse(course: Course): Observable<Course> {
        return this.http.put<Course>(`${this.url}/${course.id}`, course);
    }
}