export class Course {
    courseName: string;
    instructorName: string;
    description: string;
    imagePath: string;
    username: string;
    courseId?: string;
    userId?: string;

  constructor(courseName: string, instructorName: string, description: string, imagePath: string, username: string, courseId?: string, userId?: string) {
    this.courseName = courseName;
    this.instructorName = instructorName;
    this.description = description;
    this.imagePath = imagePath;
    this.username = username;
    this.courseId = courseId;
    this.userId = userId;
  }

}
