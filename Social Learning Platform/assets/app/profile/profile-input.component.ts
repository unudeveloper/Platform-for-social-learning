import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';


import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CourseService } from "../courses/course.service";
import { Course } from "../courses/course.model";


@Component({
    selector: 'app-profile-input',
    templateUrl: './profile-input.component.html'
})
export class ProfileInputComponent implements OnInit {
    course: Course;

    constructor(private courseService: CourseService) {}

    onSubmit(form: NgForm) {
        if (this.course) {
            // Edit
            this.course.courseName = form.value.courseName;
            this.course.instructorName = form.value.instructorName;
            this.course.description = form.value.description;
            this.course.imagePath = form.value.imagePath;
            this.courseService.updateCourse(this.course)
                .subscribe(
                    result => console.log(result)
                );
            this.course = null;
        }
        form.resetForm();
    }

    onClear(form: NgForm) {
        this.course = null;
        form.resetForm();
    }

    ngOnInit() {
        this.courseService.courseIsEdit.subscribe(
            (course: Course) => this.course = course
        );
    }


}
