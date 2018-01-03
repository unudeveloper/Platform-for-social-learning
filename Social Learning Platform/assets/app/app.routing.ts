import { Routes, RouterModule } from "@angular/router";

import { HomepageComponent } from './homepage/homepage.component';
import {CoursesComponent} from "./courses/courses.component";
import {CourseDetailComponent} from "./courses/course-detail/course-detail.component";
import {CourseEditComponent} from "./courses/course-edit/course-edit.component";
import {ProfilesComponent} from "./profile/profiles.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/homepage', pathMatch: 'full' },
    { path: 'homepage', component: HomepageComponent, pathMatch: 'full' },
    { path: 'courses', component: CoursesComponent,pathMatch: 'full'},
    { path: 'create-content', component: CourseEditComponent, pathMatch: 'full' },
    { path: 'courses/:id', component: CourseDetailComponent,pathMatch: 'full'},
    {path: 'profile', component: ProfilesComponent,pathMatch: 'full'},
    {path: 'profile/:id', component: CourseDetailComponent,pathMatch: 'full'},
];

export const routing = RouterModule.forRoot(APP_ROUTES);