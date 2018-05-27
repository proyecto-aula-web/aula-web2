import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../core/auth.service";
import { Router } from "@angular/router";
import { md5 } from "../md5/md5";


@Component({
  selector: "au-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  fullPathAsstes = "/assets/images/toSignin003.jpg";

  genderList: String[];
  signinForm: FormGroup;

  constructor(public auth: AuthService, private router: Router) {}
  // constructor() {}

  ngOnInit() {
    const text = "onInit SigninComponent";
    console.log(text, md5(text));
    // unamePattern = "^[a-z0-9_-]{8,15}$";
    // pwdPattern = "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?!.*s).{6,12}$";
    // mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
    const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";

    this.genderList = ["Male", "Female", "Others"];

    /**Using FormGroup */
    // this.signinForm = new FormGroup({
    //   email: new FormControl("", Validators.required),
    //   pwd: new FormControl(),
    //   confirmPwd: new FormControl(),
    //   gender: new FormControl(),
    //   terms: new FormControl()
    // });

    /** Nested FormGroup */
    // this.signinForm = new FormGroup({
    //   email: new FormControl("", Validators.required),
    //   password: new FormGroup({
    //     pwd: new FormControl(),
    //     confirmPwd: new FormControl()
    //   }),
    //   gender: new FormControl(),
    //   terms: new FormControl()
    // });

    this.signinForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(emailPattern)
      ]),
      password: new FormControl("", Validators.required)
        // confirmPwd: new FormControl("", Validators.required)
      // gender: new FormControl("", Validators.required),
      // requiredTrue so that the terms field isvalid only if checked
      // terms: new FormControl("", Validators.requiredTrue)
    });
  }

  onSubmit() {
    console.log("signinForm submited!!");
    // console.log("sigin Form", this.signinForm);
    // console.log("sigin Form status", this.signinForm.status);
    // console.log("sigin Form value", this.signinForm.value);
    // console.log("sigin Form controls", this.signinForm.controls);

    const email = this.signinForm.get("email");
    const password = this.signinForm.get("password");

    console.log(`email : ${email.value}, password ${password.value} ` );
    this.auth
      .emailLogin(email.value, password.value)
        .then(res => {
          console.log("EmailLogin - Respuesta", res);
          this.router.navigate(["/user-profile"]);
        })
        .catch(error => {
          console.log("EmailLogin - Error", Error);
        });
  }

  googleLogin() {
    this.auth.googleLogin()
      .then(res => {
        console.log("GoogleLogin - Respuesta", res);
        this.router.navigate(["/user-profile"]);
      })
      .catch(error => {
        console.log("GoogleLogin - Error", Error);
      });
  }
}
