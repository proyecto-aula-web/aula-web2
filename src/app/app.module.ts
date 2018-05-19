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


import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import {CoreModule} from "./core/core.module";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";

// import { CdkTableModule } from "@angular/cdk/table";


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    // CdkTableModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    BrowserAnimationsModule,
    DemoMaterialModule
  ],
  providers: [AuthService, AuthGuard],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

// platformBrowserDynamic().bootstrapModule(AppModule);
