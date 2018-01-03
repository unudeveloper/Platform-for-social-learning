import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';


import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '../course.service';
import { Course } from '../course.model';


@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  course: Course;
  id: number;
  courseForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private courseService: CourseService,
              private router: Router) { }


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
      } else {
          // Create
          const course = new Course(form.value.courseName, form.value.instructorName, form.value.description, form.value.imagePath, 'Max');
          this.courseService.addCourse(course)
              .subscribe(
                  data => console.log(data),
                  error => console.error(error)
              );
      }
      form.resetForm();
  }

    onClear(form: NgForm) {
        this.course = null;
        form.resetForm();
    }

    ngOnInit() {
        this.courseService.courseIsEdit.subscribe(
            (course: Course) => this.course = course,
            console.log(this.course)
        );
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params['id'];
                }
            );
    }
}
