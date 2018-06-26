
// import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { MatDialog, MatDialogRef, MatDialogConfig, MatSnackBarVerticalPosition } from '@angular/material';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { NewPostDialogComponent } from '../new-post-dialog/new-post-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';

@Component({
  selector: 'au-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public ListPost = [
    {
      id: '0971d5c4e07696edc27218d7ed12493e'
    },
    {
      id: '2bd9471112b806a17afa06b11d0f6950'
    },
    {
      id: '0704f066643fd35c583e309b15a44043'
    },
    {
      id: '25e75509aad6ef4e37f397f4a9d2419c'
    },
    {
      id: '8f7817a0a92d2752c189c10457972839'
    },
    {
      id: 'afe2b6be81d3565fcb85546fefd46179'
    },
    {
      id: 'dbfb27e3c0f44d480cb5a7626153885d'
    },
    {
      id: '229b46fbca4054a246b4a37c560d36d8'
    }
  ];



  add = 'Add course';
  private dialogRef: any;

  private snackConfig: {
    duration: number;
    horizontalPosition: MatSnackBarHorizontalPosition;
    verticalPosition: MatSnackBarVerticalPosition;
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

  // openNewPostDialog() {
  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;

  //   dialogConfig.data = {
  //     user: 'username0001',
  //     courseId: 'COURSEID001',
  //     themeId: 'THEMEID001'
  //   };
  //   // dialogConfig.height = '100%';
  //   // dialogConfig.data = {id: null};
  //   // dialogConfig.panelClass = 'my-full-screen-dialog';
  //   this.dialogRef = this.dialog.open(NewPostDialogComponent, dialogConfig);
  //   this.dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       console.log('Publicacion Realizada Satisfactoriamente');
  //       this.openSnackBar('Publicacion realizada correctamente', 'ok');
  //     } else {
  //       console.log('Error en la publicacion');
  //       this.openSnackBar('Error en la publicacion', 'ok');
  //     }
  //   });
  // }
}

