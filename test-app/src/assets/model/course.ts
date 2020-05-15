import { CourseRating } from './courseRating';
import { BaseEntity } from './baseEntity';

export interface Course extends BaseEntity 
{
    title: string;
    description?: string;
    dateOfPublishing: string;
    ratings?: CourseRating[];
}