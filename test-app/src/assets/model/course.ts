import { CourseRating } from './courseRating';
import { BaseEntity } from './baseEntity';

export interface Course extends BaseEntity 
{
    title: string;
    description?: string;
    dateOfPublish: string;
    ratings?: CourseRating[];
}