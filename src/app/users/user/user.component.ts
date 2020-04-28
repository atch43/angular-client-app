import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Errors } from '../../core/error/shared/error';

@Component({
    selector: 'user',
    templateUrl: `./user.component.html`

})


export class UserComponent implements OnInit {

    username: string;
    constructor(private activatedRoute: ActivatedRoute,
         private authenticationService: AuthenticationService, private router: Router) {
    }
    
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.username = params['username']; 
            if (!this.authenticationService.isAdmin() && this.username != this.authenticationService.getUsernameFromToken())
                this.router.navigate(['/error', Errors.FORBIDDEN]);
        });
    }
}