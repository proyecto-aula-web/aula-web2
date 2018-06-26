import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
  MatSnackBarVerticalPosition
} from '@angular/material';

import {
  Router,
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
  Event as NavigationEnvent
} from '@angular/router';

import { NewPostDialogComponent } from '../new-post-dialog/new-post-dialog.component';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CourseService } from '../services/course.service';
import { UserService } from '../services/user.service';
import { ThemeService } from '../services/theme.service';

import { CourseInterface } from '../models/course';
import { UserInterface } from '../models/user';
import { ThemeInterface } from '../models/theme';

@Component({
  selector: 'au-list-themes',
  templateUrl: './list-themes.component.html',
  styleUrls: ['./list-themes.component.css']
})
export class ListThemesComponent implements OnInit, OnDestroy {
  course: CourseInterface;
  userData: UserInterface;
  isInstructor: Boolean;
  isTheme: Boolean;

  private dialogRef: any;

  currentRoute: {id: string; idTheme: string};

  constructor(
    private _Router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _UserService: UserService,
    private _CourseService: CourseService
  ) {
    const id = this._CourseService.getCurrentCourseId();
    this.course = this._CourseService.getCourseData(id);
    // this.currentRoute = {};
  }

  ngOnInit() {
    console.log('del ListThemes onInit', true);

    /** Definiendo si el usuario es un instructor del curso */
    this.userData = this._UserService.getUserData();
    const find = this.course.instructors.findIndex(inst => {
      return inst === this.userData.username || inst === this.userData.email;
    });
    this.isInstructor = find !== -1 ? true : false;

    console.log(
      'del listThemes : isInstructor',
      this.isInstructor,
      this.userData.username,
      this.course.instructors
    );

    this._Router.events.forEach((event: NavigationEnvent) => {
      if (event instanceof NavigationStart) {
        console.log('----------------- NavigationStart');
        console.log(event.id);
        console.log(event.navigationTrigger);
        console.log(event.restoredState);
        console.log(event.toString());
        console.log(event.url);
      } else if (event instanceof NavigationEnd) {
        console.log('----------------- NavigationEnd');
        console.log(event.id);
        console.log(event.toString());
        console.log(event.url);
        console.log(event.urlAfterRedirects);
        console.log('-----------------');
        // console.log(event.url);
        let id, idTheme;
        const arr = event.urlAfterRedirects.split('/');
        arr.shift();

        const c = arr.findIndex((current) => {
          return (current === 'course');
        });

        const t = arr.findIndex(current => {
          return current === 'theme';
        });

        if (c !== -1) {
          id = arr[c + 1];
        }
        if (t !== -1) {
          idTheme = arr[t + 1];
        }

        this.currentRoute = {
          id: id,
          idTheme: idTheme
        };

        console.log('del currentRoute', id , idTheme, this.currentRoute);

      }
    });

    this.route.params.subscribe((params) => {
      // const id = paramMap.get('id');
      // paramMap.
      // const idTheme = paramMap.get('idTheme');
      // this.currentRoute = {
      //   id: id,
      //   idTheme: idTheme
      // };
      // console.log('del *_*currentTheme', true, id, idTheme, this.currentRoute);
      console.log('del *_*params', true, params);
    });
  }

  ngOnDestroy() {}
  goToTheme(idTheme: string) {
    // this._CourseService.setCurrentCourseId(id);
    const id = this._CourseService.getCurrentCourseId();
    this._Router.navigate([`/course/${id}/theme/${idTheme}`]);
  }

  openThemeDialog() {}

  openSubThemeDialog() {}

  openPostDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // this.currentTheme();
    console.log('del currentRoute :: courseId', this.currentRoute.id);
    console.log('del currentRoute :: themeId', this.currentRoute.idTheme);
    dialogConfig.data = {
      user: this.userData.username,
      courseId: this.course.id,
      themeId: this.currentRoute.idTheme
    };
    // dialogConfig.height = '100%';
    // dialogConfig.data = {id: null};
    // dialogConfig.panelClass = 'my-full-screen-dialog';
    this.dialogRef = this.dialog.open(NewPostDialogComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Publicacion Realizada Satisfactoriamente');
        // this.openSnackBar("Publicacion realizada correctamente", "ok");
      } else {
        console.log('Error en la publicacion');
        // this.openSnackBar("Error en la publicacion", "ok");
      }
    });
  }

  // currentTheme() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   const idTheme = this.route.snapshot.paramMap.get('idTheme');
  //   this.currentRoute = {
  //     id: id,
  //     idTheme: idTheme
  //   };
  //   console.log('del currentTheme', true, id, idTheme, this.currentRoute );
  // }

  // currentTheme() {

  // }
}
