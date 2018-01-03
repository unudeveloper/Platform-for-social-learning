
import {Component, Input, OnInit} from "@angular/core";

import { Course} from "../courses/course.model";
import { CourseService } from "../courses/course.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent {

    @Input() course: Course;
    @Input() index: number;
    constructor(private courseService: CourseService) {}

    onEditArticle() {
        this.courseService.editCourse(this.course);

    }

    onDeleteArticle() {
        this.courseService.deleteCourse(this.course)
            .subscribe(
                result => console.log(result)
            );
    }

    belongsToUser() {
        return localStorage.getItem('userId') == this.course.userId;
    }

}
