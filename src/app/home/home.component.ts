import { Component } from "@angular/core";
import { AuthenticationService } from "../shared/services/authentication.service";
import { Router } from "@angular/router";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }
    isAuthenticated() {
        return this.authenticationService.isAuthenticated();
    }

    getUsername(){
        return this.authenticationService.getUsernameFromToken();
    }

    goToLogin(){
        this.router.navigate(['/login']);
    }

    getPrivilege(){
        return this.authenticationService.getPrivilegeFromToken();
        
    }
}