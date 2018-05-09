import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './core/auth.guard';

// const routes: Routes = [];
const routes: Routes = [
  /// ...
  // { path: 'notes', component: NotesListComponent, canActivate: [AuthGuard] }
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]  },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
