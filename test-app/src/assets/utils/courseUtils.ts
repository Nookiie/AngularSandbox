import { Course } from '../model/course';

export class CourseUtils
{
    getAverageRating (course : Course) : string {
        let sum = 0;

        course.ratings.forEach(x => {
           sum += x.rating;
        });

        return (sum / course.ratings.length).toPrecision(2);
    }
}
