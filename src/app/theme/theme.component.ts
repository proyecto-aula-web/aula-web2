import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
  Event as NavigationEnvent
} from '@angular/router';

import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';

import { NewPostDialogComponent } from '../new-post-dialog/new-post-dialog.component';

import { ThemeService } from '../services/theme.service';
import { ThemeInterface } from '../models/theme';

@Component({
  selector: 'au-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  route1: { id: string; idTheme: string };

  theme: ThemeInterface;

  isloading: Boolean;
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
    private _Router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _ThemeService: ThemeService
  ) {
    this.isloading = true;
  }

  ngOnInit() {
    this.currentTheme();
    this._Router.events.forEach((event: NavigationEnvent) => {
      if (event instanceof NavigationStart) {
        this.currentTheme();
        // this.ListToShow(event.url);
      } else if (event instanceof NavigationEnd) {
        this.currentTheme();
        // this.ListToShow(event.url);
      }
    });
  }

  currentTheme() {
    const id = this.route.snapshot.paramMap.get('id');
    const idTheme = this.route.snapshot.paramMap.get('idTheme');
    this.route1 = {
      id: id,
      idTheme: idTheme
    };
    this.theme = this._ThemeService.getThemeData(idTheme);

    this._ThemeService.setCurrentThemeId(idTheme);

    console.log('del theme', this.route1, this.theme);

    if (this.theme === undefined || this.theme === null) {
      this.isloading = true;
      this._ThemeService.getOneTheme(idTheme).subscribe(themeData => {
        this.theme = themeData;
        this.isloading = false;

        console.log('del Theme response', this.theme);
        this._ThemeService.getTheme(themeData.id).subscribe(themeData2 => {
          this.theme = themeData2;
        });
      });
    } else {
      this.isloading = false;
      this._ThemeService.getTheme(idTheme).subscribe(themeData2 => {
        this.theme = themeData2;
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, this.snackConfig);
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
    // dialogConfig.height = '100%';
    // dialogConfig.data = {id: null};
    // dialogConfig.panelClass = 'my-full-screen-dialog';
    this.dialogRef = this.dialog.open(NewPostDialogComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Publicacion Realizada Satisfactoriamente');
        this.openSnackBar('Publicacion realizada correctamente', 'ok');
      } else {
        console.log('Error en la publicacion');
        this.openSnackBar('Error en la publicacion', 'ok');
      }
    });
  }
}
