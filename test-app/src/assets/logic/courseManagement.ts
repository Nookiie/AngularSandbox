import { Course } from '../model/course';

export class CourseManagement{
    showError: boolean;

    courseTitleInput: string;
    courseDescInput: string;
    courseDateOfPublishInput: string;
    
  courses: Course[] = [
    {
        "title":"Internet Technologies",
        "description": "This is the description",
        "dateOfPublishing":"2020-04-19",
        "ratings":[{
            "username":"Peter Thoroughbrow",
            "rating": 6
        },
        {
            "username":"George Davidson",
            "rating": 6
        },
        {
            "username":"James Goodwill",
            "rating": 6
        }   
        ]
    },
    {
        "title":"Big Data",
        "description": "Big Data Stuff",
        "dateOfPublishing":"2020-04-16",
        "ratings":[{
            "username":"Peter Thoroughbrow",
            "rating": 6
        },
        {
            "username":"George Davidson",
            "rating": 4
        },
        {
            "username":"James Goodwill",
            "rating": 6
        }   
        ]
    },
    {
        "title":"Angular Learning",
        "description": "Big Data Stuff",
        "dateOfPublishing":"2020-03-15",
        "ratings":[{
            "username":"Peter Thoroughbrow",
            "rating": 2
        },
        {
            "username":"George Davidson",
            "rating": 6
        },
        {
            "username":"Jimmy McGill",
            "rating": 6
        }   
        ]
    }
]
  
    courseOnAddClick(): void {
        if (!this.courseTitleInput
          || !this.courseTitleInput.trim()
          || !this.courseDescInput
          || !this.courseDescInput.trim()
          || !this.courseDateOfPublishInput
          || !this.courseDateOfPublishInput.trim()) {
          this.showError = true;
    
          return;
        }
    
        this.courses.push({
          title: this.courseTitleInput,
          description: this.courseDescInput,
          dateOfPublishing: this.courseDateOfPublishInput
        });
    
        this.courseTitleInput = null;
        this.courseDescInput = null;
        this.courseDateOfPublishInput = null;
      }
    
      courseOnRemoveClick(index: number): void {
        delete this.courses[index];
      }
    
      courseOnRemoveByLastClick(): void {
        this.courses.pop();
      }
    
}