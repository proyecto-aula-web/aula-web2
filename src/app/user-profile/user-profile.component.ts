// import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { NewPostDialogComponent } from '../new-post-dialog/new-post-dialog.component';

@Component({
  selector: 'au-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent  {

  add = 'Add course';
  constructor(public auth: AuthService,
  public dialog: MatDialog ) { }

  // ngOnInit() {
  // }

  openDialogCourse() {
    console.log('Abir el boton de dialog');

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.data = {id: null};
    this.dialog.open(CourseDialogComponent, dialogConfig);
  }


  openNewPostDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.height = '600px';
    // dialogConfig.data = {id: null};
    this.dialog.open(NewPostDialogComponent, dialogConfig);
  }

}
