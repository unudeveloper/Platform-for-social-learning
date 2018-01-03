import {Component, OnInit, Input} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import {Course} from '../../course.model';




@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

  @Input() course: Course;
  @Input() index: number;

    private photo: SafeStyle;
    private photo_1: SafeStyle;
    constructor(private sanitizer: DomSanitizer) { }



  ngOnInit() {
      this.photo = '/assets/image/bg-img-3.jpg';
      this.photo_1 = '/assets/image/bg-img-2.jpg';
  }

}
