// import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { MatDialog, MatDialogRef, MatDialogConfig, MatSnackBarVerticalPosition } from '@angular/material';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { NewPostDialogComponent } from '../new-post-dialog/new-post-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';

@Component({
  selector: 'au-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  add = 'Add course';
  private dialogRef: any;

  private snackConfig: {
    duration: number,
    horizontalPosition: MatSnackBarHorizontalPosition,
    verticalPosition: MatSnackBarVerticalPosition
  } = {
    duration: 2000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };
  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  // ngOnInit() {
  // }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, this.snackConfig);
  }

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
      courseId: 'COURSEID001',
      themeId: 'THEMEID001'
    };
    // dialogConfig.height = '600px';
    // dialogConfig.data = {id: null};
    this.dialogRef = this.dialog.open(NewPostDialogComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`); // Pizza!

      if (result) {
        console.log('Publicacion Realizada Satisfactoriamente');
        this.openSnackBar('Publicacion realizada correctamente', 'ok');
        // this.flashMessage.show('Publicacion realizada correctamente', {cssClass: 'alert-success', timeout: 4000});
      } else {
        console.log('Error en la publicacion');
        this.openSnackBar('Error en la publicacion', 'ok');
        // this.flashMessage.show( 'Error en la publicacion', { cssClass: 'alert-danger', timeout: 20000 });
      }
    });
  }
}
