import { Course } from './course';

export interface User 
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