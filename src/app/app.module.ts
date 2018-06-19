import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";

import { ReactiveFormsModule } from "@angular/forms";

import { AuthGuard } from "./core/auth.guard";
import { AuthService } from "./core/auth.service";

import { DemoMaterialModule } from "./demo-material/demo-material.module";


import { AngularFireModule, FirebaseOptionsToken } from "angularfire2";
import { environment } from "../environments/environment";
import {CoreModule} from "./core/core.module";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { NewCourseComponent } from './new-course/new-course.component';
import { DeleteThemeDialogComponent } from './delete-theme-dialog/delete-theme-dialog.component';
import { NewThemeComponent } from './new-theme/new-theme.component';
import { ThemeDialogComponent } from './theme-dialog/theme-dialog.component';

import { ThemeService } from './services/theme.service';
import { CourseService } from './services/course.service';
import { GroupService } from './services/group.service';
import { InstitutionService } from './services/institution.service';
import { EvaluationService } from './services/evaluation.service';
import { UserService } from './services/user.service';

import { FormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';

import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';

// import { CdkTableModule } from "@angular/cdk/table";


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    SigninComponent,
    SignupComponent,
    NewCourseComponent,
    DeleteThemeDialogComponent,
    NewThemeComponent,
    ThemeDialogComponent,
    NavigationBarComponent,
    CourseDialogComponent,

  ],
  imports: [
    // CdkTableModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule,
    CoreModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    FlashMessagesModule,
  ],
  providers: [AuthService, AuthGuard, ThemeService, FlashMessagesService, CourseService, GroupService, InstitutionService, 
  EvaluationService, UserService, { provide: FirebaseOptionsToken, useValue: environment.firebase }],
  entryComponents: [AppComponent, ThemeDialogComponent, DeleteThemeDialogComponent, CourseDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

// platformBrowserDynamic().bootstrapModule(AppModule);
