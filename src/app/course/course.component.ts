import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { CourseInterface } from '../models/course';

@Component({
  selector: 'au-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  idToShow: string;
  course: CourseInterface;

  constructor(
    private route: ActivatedRoute,
    private _CourseService: CourseService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.idToShow = id;
    this._CourseService.setCurrentCourseId(id);

    this.course = this._CourseService.getCourseData(id);

    this._CourseService.getCourse(id).subscribe((courseData) => {
      this.course = courseData;
    });
  }
}
