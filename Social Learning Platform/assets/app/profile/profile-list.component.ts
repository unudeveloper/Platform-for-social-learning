import { Component, Input, OnInit } from "@angular/core";

import { Course } from '../courses/course.model';
import { CourseService } from '../courses/course.service';

@Component({
    selector: 'app-profile-list',
    templateUrl: './profile-list.component.html'
})
export class ProfileListComponent implements OnInit {
    courses: Course[];

    @Input() course: Course;

    constructor(private courseService: CourseService) {}

    ngOnInit() {
        this.courseService.getCourses()
            .subscribe(
                (courses: Course[]) => {
                    this.courses = courses;
                }
            );
    }
}