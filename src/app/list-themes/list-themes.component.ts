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

import { CourseInterface } from '../models/course';
import { UserInterface } from '../models/user';

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

  constructor(
    private _Router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _UserService: UserService,
    private _CourseService: CourseService
  ) {
    const id = this._CourseService.getCurrentCourseId();
    this.course = this._CourseService.getCourse(id);
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
        // this.ListToShow(event.url);
      } else if (event instanceof NavigationEnd) {
        // this.ListToShow(event.url);
      }
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

    dialogConfig.data = {
      user: this.userData.username,
      courseId: this.course.id,
      themeId: undefined
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



  currentTheme() {
    const id = this.route.snapshot.paramMap.get('id');
    const idTheme = this.route.snapshot.paramMap.get('idTheme');
    // this.route1 = {
    //   id: id,
    //   idTheme: idTheme
    // };
  }
}
