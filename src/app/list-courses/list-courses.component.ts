import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseInterface } from '../models/course';
import { UserInterface } from '../models/user';
import { UserService } from '../services/user.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'au-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {
  public coursesId: string[];
  private coursesObservables: Object;
  public courses: Object;

  private UserData: UserInterface;

  constructor(
    private _UserService: UserService,
    private _CourseService: CourseService,
    private _Router: Router
  ) {
    this.coursesObservables = {};
    this.courses = {};
  }

  ngOnInit() {
    console.log('del onInit', true);
    const _userData = this._UserService.getUserData();
    this.UserData = _userData;
    this.coursesId = _userData.id_course;
    if (this.coursesId.length > 0) {
      this.loadCourses();
    }
    this._UserService.getCurrentUser().subscribe(userData => {
      console.log('del userData', userData);
      this.coursesId = userData.id_course;
      this.loadCourses();
    });
    console.log('del ListCourse OnInit', _userData);
  }

  loadCourses() {
    console.log('del loadCourses0', true);
    for (let i = 0; i < this.coursesId.length; i++) {
      const id = this.coursesId[i];
      const element = this._CourseService.getOneCourse(id);
      this.coursesObservables[id] = element;
      element.subscribe(courseData => {
        console.log('del ListCourses', courseData);
        this.courses[courseData.id] = courseData;

        console.log('del courses', this.courses);

        /** eliminar */
        this._CourseService.addNewCourse(courseData);
      });
    }
  }

  goToCourse(id: string) {
    this._Router.navigate([`/course/${id}`]);
  }

}
