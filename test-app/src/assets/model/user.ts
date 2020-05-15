import { Course } from './course';
import { BaseEntity } from './baseEntity';

export interface User extends BaseEntity
{
    username: string;
    fname: string;
    lname: string;
    password: string;
    email: string;

    isAdmin?: boolean;
    isBlocked?: boolean;
    favouriteCourses?: Course[];
}