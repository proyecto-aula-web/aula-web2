import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'au-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {
  isLinear = false;
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


  constructor(private _formBuilder: FormBuilder) {}

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
  }
}
