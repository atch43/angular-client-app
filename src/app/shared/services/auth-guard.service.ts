import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) { }

  canActivate(): boolean {
    if (this.auth.isAuthenticated())
      return true;
    else {
      this.router.navigate(['/error', 401])
      return false;
    }
  }
}


@Injectable()
export class AuthGuardAdmin implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) { }

  canActivate(): boolean {
    if (this.auth.isAdmin())
      return true;
    else {
      this.router.navigate(['/error',403]);
      return false;
    }

  }
}

@Injectable()
export class AuthGuardServiceNot implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) { }

  canActivate(): boolean {
    return !this.auth.isAuthenticated();
  }
}