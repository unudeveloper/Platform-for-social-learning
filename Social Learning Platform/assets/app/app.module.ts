import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseItemComponent } from './courses/course-list/course-item/course-item.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { AuthComponent} from './auth/auth.component';
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { ProfileComponent } from "./profile/profile.component"

import {DropdownDirective} from './Shared/dropdown.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {CourseService} from './courses/course.service';
import {AuthService} from './auth/auth.service';
import { ProfileListComponent} from "./profile/profile-list.component";
import { ProfileInputComponent } from "./profile/profile-input.component";
import {ProfilesComponent} from "./profile/profiles.component";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomepageComponent,
        CoursesComponent,
        CourseListComponent,
        CourseItemComponent,
        CourseDetailComponent,
        CourseEditComponent,
        DropdownDirective,
        AuthComponent,
        ErrorComponent,
        ProfileComponent,
        ProfileListComponent,
        ProfileInputComponent,
        ProfilesComponent
    ],
    imports: [
        BsDropdownModule.forRoot(),
        CarouselModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        HttpModule
    ],
    providers: [CourseService, AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}