import { Component } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isError: boolean = false;
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  logout() {
    this.authenticationService.logout().subscribe(() => {
      localStorage.removeItem("currentUser");
      this.router.navigate(['/']);
    });
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }
  isAdmin() {
    return this.authenticationService.isAdmin();
  }

}




