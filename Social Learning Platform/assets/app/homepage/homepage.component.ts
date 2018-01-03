import {Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
    private photo: SafeStyle;
    private photo_1: SafeStyle;
    constructor(private sanitizer: DomSanitizer, private router: Router) { }

    ngOnInit() {
        this.photo = '/assets/image/bg-img-3.jpg';
        this.photo_1 = '/assets/image/bg-img-2.jpg';
    }

    search(queryString) {
        this.router.navigate(['/courses/'], {queryParams: {search: queryString}});
    }

}