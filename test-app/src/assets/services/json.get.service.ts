import { CoursesService } from './courses.service';
import { UserService } from './users.service';
import { Course } from '../model/course';
import { User } from '../model/user';

export class JsonGetService {

    users: User[];
    courses: Course[];
    constructor(protected userService?: UserService, protected courseService?: CoursesService) {

    }
    protected getUsers(searchValue?: string): void {
        this.userService.getUsers(searchValue).pipe()
            .subscribe(response => {
                this.users = response;
            }, error => {
                console.log(error);
            });
    }

    protected getCourses(searchValue?: string): void {
        this.courseService.getCourses(searchValue).pipe()
            .subscribe(response => {
                this.courses = response;
            }, error => {
                console.log(error);
            });
    }
}