// import { Component, OnInit } from "@angular/core";
import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'au-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent  {

  constructor(public auth: AuthService ) { }

  // ngOnInit() {
  // }

}
