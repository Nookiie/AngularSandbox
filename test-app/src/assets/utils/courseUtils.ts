import { Course } from '../model/course';

export class CourseUtils
{
    getAverageRating (course : Course) : number {
        let sum = 0;

        course.ratings.forEach(x => {
           sum += x.rating;
        });

        return sum / course.ratings.length;
    }
}
