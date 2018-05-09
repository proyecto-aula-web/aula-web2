// import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";

import { ReactiveFormsModule } from "@angular/forms";

import { AuthGuard } from "./core/auth.guard";

import { DemoMaterialModule } from "./demo-material/demo-material.module";



import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import {CoreModule} from "./core/core.module";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";

// import {MatSidenavModule} from "@angular/material/sidenav";
// import { MatToolbarModule } from "@angular/material/toolbar";
// import { MatIconModule } from "@angular/material/icon";

// import {
//   FormBuilder,
//   FormGroup,
//   FormControl,
//   Validators
// } from "@angular/forms";

// import {
//   MatAutocompleteModule,
//   MatButtonModule,  /** */
//   MatButtonToggleModule,
//   MatCardModule,  /** */
//   MatCheckboxModule,
//   MatChipsModule,
//   MatDatepickerModule,
//   MatDialogModule,
//   MatDividerModule,
//   MatExpansionModule,
//   MatGridListModule,  /** */
//   MatIconModule,    /** */
//   MatInputModule, /** */
//   MatListModule,
//   MatMenuModule,
//   MatNativeDateModule,
//   MatPaginatorModule,
//   MatProgressBarModule,
//   MatProgressSpinnerModule,
//   MatRadioModule,
//   MatRippleModule,
//   MatSelectModule,
//   MatSidenavModule, /** */
//   MatSliderModule,
//   MatSlideToggleModule,
//   MatSnackBarModule,
//   MatSortModule,
//   MatStepperModule,
//   MatTableModule,
//   MatTabsModule,
//   MatToolbarModule, /** */
//   MatTooltipModule,
// } from "@angular/material";
import { CdkTableModule } from "@angular/cdk/table";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

// @NgModule({
//   exports: [
//     MatAutocompleteModule,
//     MatButtonModule,
//     MatButtonToggleModule,
//     MatCardModule,
//     MatCheckboxModule,
//     MatChipsModule,
//     MatStepperModule,
//     MatDatepickerModule,
//     MatDialogModule,
//     MatDividerModule,
//     MatExpansionModule,
//     MatGridListModule,
//     MatIconModule,
//     MatInputModule,
//     MatListModule,
//     MatMenuModule,
//     MatNativeDateModule,
//     MatPaginatorModule,
//     MatProgressBarModule,
//     MatProgressSpinnerModule,
//     MatRadioModule,
//     MatRippleModule,
//     MatSelectModule,
//     MatSidenavModule,
//     MatSliderModule,
//     MatSlideToggleModule,
//     MatSnackBarModule,
//     MatSortModule,
//     MatTableModule,
//     MatTabsModule,
//     MatToolbarModule,
//     MatTooltipModule
//   ]
//   // declarations: [LoginComponent, SigninComponent, SignupComponent]
// })
// export class DemoMaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CdkTableModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    // MatSidenavModule,
    // MatToolbarModule,
    // MatIconModule
    BrowserAnimationsModule,
    DemoMaterialModule
    // FormBuilder,
    // FormGroup,
    // FormControl,
    // Validators
  ],
  providers: [AuthGuard],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

// platformBrowserDynamic().bootstrapModule(AppModule);
