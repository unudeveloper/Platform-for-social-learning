import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';


import {Course} from './course.model';
import { ErrorService } from "../errors/error.service";



@Injectable()
export class CourseService {

    private courses: Course[] = [];
    courseIsEdit = new EventEmitter<Course>();

    constructor(private http: Http, private errorService: ErrorService) {
    }

    addCourse(course: Course) {
        const body = JSON.stringify(course);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:3000/course' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const course = new Course(
                    result.obj.courseName,
                    result.obj.instructorName,
                    result.obj.description,
                    result.obj.imagePath,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id);
                this.courses.push(course);
                console.log(result.obj.user.firstName);
                return course;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getCourseByName(search: any) {
        console.log(search);
        return this.http.get('http://localhost:3000/courses/?search='+search)
            .map((response: Response) => {
                console.log(response);
                // return response.json();

            });
    }

  getCourses() {
      return this.http.get('http://localhost:3000/course')
          .map((response: Response) => {
              const courses = response.json().obj;
              let transformedCourses: Course[] = [];
              for (let course of courses) {
                  transformedCourses.push(new Course(
                      course.courseName,
                      course.instructorName,
                      course.description,
                      course.imagePath,
                      course.user.firstName,
                      course._id,
                      course.user._id)
                  );
                  console.log(response.json().obj);
              }
              this.courses = transformedCourses;
              return transformedCourses;
          })
          .catch((error: Response) => {
              this.errorService.handleError(error.json());
              return Observable.throw(error.json());
          });
  }

getCourse(index: number) {
    return this.courses[index];
  }



    editCourse(course: Course) {
        this.courseIsEdit.emit(course);
        console.log(this.courseIsEdit.emit(course));
    }

    updateCourse(course: Course) {
        const body = JSON.stringify(course);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('http://localhost:3000/course/' + course.courseId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

  deleteCourse(course: Course) {
      this.courses.splice(this.courses.indexOf(course), 1);
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.delete('http://localhost:3000/course/' + course.courseId + token)
          .map((response: Response) => response.json())
          .catch((error: Response) => {
              this.errorService.handleError(error.json());
              return Observable.throw(error.json());
          });
  }

}
