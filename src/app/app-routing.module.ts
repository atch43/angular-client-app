import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login/login-form.component';
import { AuthGuardServiceNot, AuthGuardService, AuthGuardAdmin } from './shared/services/auth-guard.service';
import { UsersListComponent } from './users/user-list/users-list.component';
import { UserComponent } from './users/user/user.component';
import { ForbiddenComponent } from './core/error/forbidden.component';

const routes: Routes = [
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuardAdmin] },
  { path: 'profile/:username', component: UserComponent, canActivate: [AuthGuardService] },
  { path: 'error/:error', component: ForbiddenComponent },
  { path: '', component: LoginFormComponent },
  { path: '**', component: ForbiddenComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
