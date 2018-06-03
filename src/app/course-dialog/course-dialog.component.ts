import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { ThemeService } from '../services/theme.service';
import { ThemeInterface } from '../models/theme';
import { CourseInterface } from '../models/course';
import { InstitutionInterface } from '../models/institution';
import {md5} from '../md5/md5';

@Component({
  selector: 'au-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  isLinear = false;
  public themes: ThemeInterface[] = [];
  public enteros: Number[];
  public course: CourseInterface = {
    id: '',
    name: '',
  code: '',
  institution: null,
  instructors: [],
  stundens: [],
  schedule: [], /** horario */
  evaluations: [],
  themes: [],
  lastUpdate: '',

  };

  public institution : InstitutionInterface = {
    id: '',
    name : '',
  };

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
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern(/^[0-9a-zA-Z]+$/)]],
      institution: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45), Validators.pattern(/^[a-zA-Z]/)]],
    });

    this.stepTwoForm = this._formBuilder.group({
      name : '',
    });
    //this.getThemes();
  }

  close(){
  	this.dialogRef.close();
  }

  getThemes(){
    this.themeService.getAllThemes().subscribe(themes => this.themes = themes);
    console.log(this.themes);
  }

  onClickNextOne(){

    var fecha = new Date();
    this.course.id = md5(this.stepOneForm.get('name').value + fecha);
    this.course.name = this.stepOneForm.get('name').value;
    this.course.code = this.stepOneForm.get('code').value;
    this.institution.id = md5(this.stepOneForm.get('institution').value + fecha);
    this.institution.name = this.stepOneForm.get('institution').value;
    this.course.institution = this.institution;
    
    console.log("Course Interface:   " + this.course.name + "|" + this.course.institution.name);
  }


  onClickNextTwo(){
     console.log("Theme Interface:     " + this.stepTwoForm.get('name').value);
  }

  addTheme(){

    var fecha = new Date();
    var auxTheme: ThemeInterface = {
      id: '',
      id_course: '',
      name: '',
       description: '',
      subthemes: [],
      posts: [],
  };

    auxTheme.id_course = this.course.id;
    auxTheme.id = md5(this.stepTwoForm.get('name').value + this.course.name + fecha);
    auxTheme.name = this.stepTwoForm.get('name').value;
    this.themes.push(auxTheme);

    console.log(this.themes);
  }

  onDeleteTheme(themeId : string){
    this.themes = this.themes.filter(theme => theme.id !== themeId);
    console.log(this.themes);
  }
}
