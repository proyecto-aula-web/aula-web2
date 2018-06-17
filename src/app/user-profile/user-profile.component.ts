// import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { NewPostDialogComponent } from '../new-post-dialog/new-post-dialog.component';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'au-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent  {

  add = 'Add course';
  private dialogRef: any;

  constructor(public auth: AuthService,
    public dialog: MatDialog, public flashMessage: FlashMessagesService) { }

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

    dialogConfig.data = {
      user: 'username0001',
      courseId : 'COURSEID001',
      themeId : 'THEMEID001'

    };
    // dialogConfig.height = '600px';
    // dialogConfig.data = {id: null};
    this.dialogRef = this.dialog.open(NewPostDialogComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`); // Pizza!

      if (result) {
        console.log('Publicacion Realizada Satisfactoriamente');
        this.flashMessage.show('Publicacion realizada correctamente', {cssClass: 'alert-success', timeout: 4000});
      } else {
        console.log('Error en la publicacion');
        this.flashMessage.show( 'Error en la publicacion', { cssClass: 'alert-danger', timeout: 4000 });
      }
    });
  }

}
