import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";



import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthService} from '../auth/auth.service';

import { Course } from '../courses/course.model';
import {User} from "../auth/user.model";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
    isIn : boolean = false;   // store state
    modalRef: BsModalRef;
    modalRef2: BsModalRef

    myForm1: FormGroup;

    myForm2: FormGroup;

    isSignUp : boolean = false;

    openModal(template: TemplateRef<any>) {
        let bool = this.isIn;
        this.isIn = bool === false ? true : false;
        this.modalRef = this.modalService.show(template);
        this.closeFirstModal();

    }

    openModal2(template: TemplateRef<any>) {
        let bool = this.isIn;
        this.isIn = bool === false ? true : false;
        this.modalRef2 = this.modalService.show(template);
    }

    @Input() course: Course;

    constructor(private authService: AuthService, private router: Router,private modalService: BsModalService) {}

    onLogout() {
        this.authService.logout();
        this.router.navigate(['homepage']);
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }


    onSubmitLogin() {
        const user = new User(this.myForm1.value.email, this.myForm1.value.password);
        this.authService.login(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/courses');
                },
                error => console.error(error)
            );
        this.myForm1.reset();
    }

    onSubmitSignUp() {
        const user = new User(
            this.myForm2.value.email,
            this.myForm2.value.password,
            this.myForm2.value.firstName,
            this.myForm2.value.lastName
        );
        this.authService.signup(user)
            .subscribe(
                data =>
                    console.log(data),
                error => console.error(error)
            );
        this.myForm2.reset();


    }

    ngOnInit() {
        this.myForm2 = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });

        this.myForm1 = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }

    closeFirstModal() {
       // console.log("inside close first modal");
        this.modalRef2.hide();
       // this.modalRef2 = null;
    }

    toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false;
    }

}