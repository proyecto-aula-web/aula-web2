import { AbstractControl } from "@angular/forms";
// import { observableOf } from "rxjs/Observable";

export class PasswordValidation {
  // validate(AC: AbstractControl): ValidatorFn {
         static MatchPassword(AC: AbstractControl) {
           // console.log("AC AbstractControl value", AC.value);
           // // console.log("AC AbstractControl root", AC.root);
           const pwd = AC.root.get("password").get("pwd").value; // to get value in input tag
           const confirmPwd = AC.value; // to get value in input tag
           console.log("password", AC.root.get("password"));
           // console.log("pwd", pwd);
           // console.log("confirmPwd", confirmPwd);
           // console.log("PasswordValidation MatchPassword false");
           if (pwd !== confirmPwd) {
             console.log("false");
             AC.root.get("password").setErrors({ MatchPassword: true });
           } else {
             console.log("true");
             return null;
           }
          // return null;
         }
       }
