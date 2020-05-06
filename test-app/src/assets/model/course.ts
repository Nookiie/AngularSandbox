import { CourseRating } from './courseRating';

export interface Course 
{
    title: string;
    description?: string;
    dateOfPublishing: string;
    ratings?: CourseRating[];
}