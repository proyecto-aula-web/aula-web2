import { Component, OnInit } from "@angular/core";
// import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { AuthService } from "../core/auth.service";
import { Router } from "@angular/router";
import { PasswordValidation } from "./password-validation";

@Component({
  selector: "au-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  images = {
    // fullPathAsstes: "/assets/images/tosignup003.jpg",
    img1: "/assets/images/image001.jpg",
    img2: "/assets/images/image002.jpg"
  };

  // model = { /**eliminar */
  //   pwd: false,
  //   chnagePwd: () => {
  //     const pwd = this.signupForm.get("password");
  //     console.log("ConfirmPwd change", pwd);
  //     if (pwd.value.pwd !== pwd.value.confirmPwd) {
  //       this.model.pwd = true;
  //     } else {
  //       this.model.pwd = false;
  //     }
  //   }
  // };

  // genderList: String[];
  signupForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    // setTimeout(() => {
      this.createForm();
    // }, 20);

  }

  ngOnInit() {
    console.log("onInit SingupComponent");
    // this.createForm();

    // this.signupForm = new FormGroup({
    //   name: new FormGroup({
    //     firstname: new FormControl("", Validators.required),
    //     lastname: new FormControl("", Validators.required)
    //   }),
    //   username: new FormControl("", [
    //     Validators.required,
    //     Validators.pattern(usernamePattern)
    //   ]),
    //   email: new FormControl("", [
    //     Validators.required,
    //     Validators.pattern(emailPattern)
    //   ]),
    //   password: new FormGroup({
    //     pwd: new FormControl("", Validators.required),
    //     confirmPwd: new FormControl("", Validators.required)
    //   })
    //   // gender: new FormControl("", Validators.required),
    //   // requiredTrue so that the terms field isvalid only if checked
    //   // terms: new FormControl("", Validators.requiredTrue)
    // });
  }

  // constructor(private fb: FormBuilder) {
  //   this.createForm();
  // }
  createForm() {
    const usernamePattern = "^[a-z0-9_]{4,25}$";
    const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";

    this.signupForm = this.fb.group({
      // <-- the parent FormGroup
      name: this.fb.group({
        firstname: ["", Validators.required],
        lastname: ["", Validators.required]
      }),
      username: ["", [Validators.required, Validators.pattern(usernamePattern)]],
      email: ["", [Validators.required, Validators.pattern(emailPattern)]],
      password: this.fb.group({
        pwd: ["", Validators.required],
        confirmPwd: ["", Validators.required]
      })
    });
  }

  onSubmit() {
    const username = this.signupForm.get("username");
    const name = this.signupForm.get("name");
    const email = this.signupForm.get("email");
    const password = this.signupForm.get("password");
    const additionalUserInfo = {
      firstname: name.value.firstname,
      lastname: name.value.lastname,
      username: username.value
    };

    console.log("signupForm submited!!");
    console.log("RegisterUser actived!!");
    // console.log(this.signupForm.get("name"));
    // console.log(this.signupForm.get("username"));
    // console.log(this.signupForm.get("email"));
    // console.log(this.signupForm.get("password"));
    // console.log("signup Form", this.signupForm);
    // console.log("signup Form status", this.signupForm.status);
    // console.log("signup Form value", this.signupForm.value);
    // console.log("signup Form controls", this.signupForm.controls);

    this.auth
      .registerUser(email.value, password.value.pwd, additionalUserInfo)
      .then(res => {
        console.log("RegisterUser - Respuesta", res);
        this.router.navigate(["/user-profile"]);
      })
      .catch(error => {
        console.log("RegisterUser - Error", Error);
      });
  }
}
