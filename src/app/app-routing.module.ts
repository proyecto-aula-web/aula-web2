import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NewThemeComponent } from './new-theme/new-theme.component';
import { AuthGuard } from './core/auth.guard';
// import { NewCourseComponent } from './new-course/new-course.component';
import { CourseComponent } from './course/course.component';
import { ThemeComponent } from './theme/theme.component';


// const routes: Routes = [];
const routes: Routes = [
  /// ...
  // { path: 'notes', component: NotesListComponent, canActivate: [AuthGuard] }
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  // { path: 'course', component: NewCourseComponent },
  {
    path: 'course/:id',
    component: CourseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'course/:id/theme/:idTheme',
    component: ThemeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  // { path: 'new-theme', component: NewThemeComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: '**', redirectTo: '/signin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
