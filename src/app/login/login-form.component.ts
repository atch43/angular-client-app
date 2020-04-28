import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatedUser } from '../shared/authenticated-user';
import { User } from '../users/shared/user';
import { AuthenticationService } from '../shared/services/authentication.service';


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
    this.handleError = this.handleError.bind(this);
    this.changeText=false;
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    }
    );
  }

  changeText:boolean;

  loginForm: FormGroup;
  showSpinner = false;
  title = 'Login';
  model = new User();
  submitted = false;
  errorMessage = "";

  //#region checks

  getUsername(){
    return this.authenticationService.getUsernameFromToken();
  }

  getPrivilege(){
    return this.authenticationService.getPrivilegeFromToken();
  }

  isAuthenticated(){
    return this.authenticationService.isAuthenticated();
  }
  
  checkDisabled(): boolean {
    return !this.loginForm.valid;
  }

  hasErrorMessage(): boolean {
    return this.errorMessage != "";
  }

  //#endregion

  private handleError(error: any): Promise<any> {
    this.showSpinner = false;
    switch (error.status) {
      case 400:;
      case 403:;
      case 500: this.errorMessage = "Something went wrong, please try again later"; break;
      case 401: this.errorMessage = "Invalid email/password"; break;
    }
    return Promise.resolve(error.message || error);
  }

  onSubmit(): void {
    this.showSpinner = true;
    this.authenticationService.loginUser(this.loginForm.getRawValue())
      .then(response => {
        
        this.showSpinner = false;
        var user = response.body;
        if (user.username != null) {
          localStorage.setItem("currentUser", JSON.stringify(new AuthenticatedUser(user.username, user.token, user.privilege.description)));
          if (user.privilege.description == "ADMIN") {
            this.router.navigate(['users']);
          }
          else {
            this.router.navigate(['profile/', user.username]);
          }
        }
        // else {
        //   this.errorMessage = "Invalid email/password";
        // }
      }).catch(this.handleError);
  };



  //#endregion
}