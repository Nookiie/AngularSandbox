import { User } from './user';
import { Course } from './course';
import { BaseEntity } from './baseEntity';

export interface CourseRating extends BaseEntity
{
    username: string;
    rating: number;
}