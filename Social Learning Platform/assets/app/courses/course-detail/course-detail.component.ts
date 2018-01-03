import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Course} from '../course.model';
import {CourseService} from '../course.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: Course;
  id: number;
  private photo: SafeStyle;

  constructor( private courseService: CourseService,
               private route: ActivatedRoute,
               private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.course = this.courseService.getCourse(this.id);
        }
      );
      this.photo = '/assets/image/articles.jpeg';
  }

}
