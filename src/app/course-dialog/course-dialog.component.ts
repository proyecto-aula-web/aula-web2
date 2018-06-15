import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ThemeService } from '../services/theme.service';
import { ThemeInterface } from '../models/theme';

@Component({
  selector: 'au-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  isLinear = false;
  public themes: ThemeInterface[];
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;

  stepOneForm: FormGroup;
  stepTwoForm: FormGroup;
  stepThreeForm: FormGroup;
  stepFourForm: FormGroup;
  stepFiveForm: FormGroup;

   print: Object = {
    name : 'Nombre curso',
    code : 'Código',
    institution: 'Institución',
    next : 'Siguiente',
    required : 'Requerido'
  };

  public theme: ThemeInterface = {
    id: '',
    id_course: '',
    name: '',
    description: '',
    subthemes: [],
    posts: [],
  };

  public day: boolean;
  lunes = false;

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private themeService: ThemeService,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    //   // firstCtrl: ['']
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });

    this.stepOneForm = this._formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      institution: ['', Validators.required],
    });

    this.getThemes();
  }

  close() {
    this.dialogRef.close();
  }

  getThemes() {
    this.themeService.getAllThemes().subscribe(themes => this.themes = themes);
    console.log(this.themes);
  }


}
