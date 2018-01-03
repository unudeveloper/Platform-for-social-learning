import { Component } from "@angular/core";

@Component({
    selector: 'app-profiles',
    template: `

        <div class="row search-result-main-div">
            <app-profile-list></app-profile-list>
        </div>

        <div class="row search-result-main-div">
            <app-profile-input></app-profile-input>
        </div>

`
})
export class ProfilesComponent {

}