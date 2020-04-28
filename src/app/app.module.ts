import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginFormComponent } from './login/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from './shared/services/authentication.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuardAdmin, AuthGuardService, AuthGuardServiceNot } from './shared/services/auth-guard.service';
import { NgbdSortableHeader } from './shared/sortable';
import { UsersListComponent } from './users/user-list/users-list.component';
import { UserComponent } from './users/user/user.component';
import { UserService } from './users/shared/user.service';
import { PagerService } from './shared/services/pager.service';
import { JwtInterceptor } from './http/jwt-interceptor';
import { ForbiddenComponent } from './core/error/forbidden.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserAddressesComponent } from './addresses/user-addresses/user-addresses.component';
import { DatePipe } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserSkillsComponent } from './skills/user-skills/user-skills.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    NgbdSortableHeader,
    UsersListComponent,
    UserAddressesComponent,
    UserComponent,
    UserFormComponent,
    ForbiddenComponent,
    UserSkillsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule
    ],
  providers: [AuthenticationService, UserService, JwtHelperService, PagerService, DatePipe,
     { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, 
     AuthGuardService, AuthGuardServiceNot, AuthGuardAdmin,
     {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
