import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

import { ThemeService } from '../services/theme.service';

import { ThemeInterface } from '../models/theme';
import { CourseInterface } from '../models/course';
import { InstitutionInterface } from '../models/institution';
import { UserInterface } from '../models/user';
import { GroupInterface } from '../models/group';
import { EvaluationInterface } from '../models/evaluation';

import {md5} from '../md5/md5';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'au-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  isLinear = false;
  public email_father: string;
  public themes: ThemeInterface[] = [];
  public instructors : UserInterface[] = [];
  public students: UserInterface[] = [];
  public enteros: Number[];
  public groups: GroupInterface[] = [];
  public evaluations: EvaluationInterface[] = [];

  public course: CourseInterface = {
    id: '',
    name: '',
  code: '',
  email_owner: '',
  instructors: [],
  institution: null,
  groups: [],
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

  public selectThemes: boolean[] = [];

  constructor(
  	private _formBuilder: FormBuilder,
  	private dialogRef: MatDialogRef<CourseDialogComponent>,
  	private themeService: ThemeService,
    public authService: AuthService,
  	@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    //   // firstCtrl: ['']
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
    
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.email_father = auth.email;
      } else {
        this.email_father = null;
      }

    });

    this.stepOneForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]],
      code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern(/^[0-9a-zA-Z]+$/)]],
      institution: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45), Validators.pattern(/^[a-zA-Z]/)]],
    });

    this.stepTwoForm = this._formBuilder.group({
      name : '',
    });

    this.stepThreeForm = this._formBuilder.group({
      email : '',
      students : [],
      group: '',
    });

    this.stepFourForm = this._formBuilder.group({
       evaluation:'',
       group: '',
       date: null,
       percent: '',
    });

    this.stepFiveForm = this._formBuilder.group({
      date_ini: null,
      date_cul: null,
      group: '',

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
    this.course.email_owner = this.email_father;
    
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
    this.selectThemes.push(false);

    console.log(this.themes);
    console.log(this.selectThemes);
  }

  onDeleteTheme(themeId : string, index: number){
    this.themes = this.themes.filter(theme => theme.id !== themeId);
    this.selectThemes.splice(index,1);
    console.log(this.themes);
  }

  addInstructor(){
    var fecha = new Date();

    var auxInstructor: UserInterface = {
      uid: '',
      email: '',
      username: '',
      firstname: '',
      lastname: '',
      displayName: '',
      photoURL: '',
      provider: '',
      id_course: [],
      groupId: [],
    };

    auxInstructor.email = this.stepThreeForm.get('email').value;
    auxInstructor.id_course.push(this.course.id);
    this.instructors.push(auxInstructor);

  }

  onDeleteInstructor(instructorEmail : string){
    this.instructors = this.instructors.filter(instructor => instructor.email !== instructorEmail);
    console.log(this.instructors);
  }

  addGroup(){

    var fecha = new Date();

    var group: GroupInterface = {
      id: '',
      id_course: '',
      name: '',
      stundents: [],
      schedule: [],
      evaluations: [],
    }

    var auxStudents: string[]=[];
    
    if(this.stepThreeForm.get('students').value!==null)
      auxStudents = this.stepThreeForm.get('students').value.split(/\n/g);
    
    group.name = this.stepThreeForm.get('group').value;
    group.stundents = auxStudents;
    group.id_course = this.course.id;
    group.id = md5(group.id_course + group.name + fecha);
    this.groups.push(group);

    console.log("Estudiantes correos: " + group);

    }

    onDeleteGroup(groupId: string){
      this.groups = this.groups.filter(group => group.id !== groupId);
      console.log(this.groups);
    }

    addEvaluation(){
        console.log(this.selectThemes);

        var fecha = new Date();

        var evaluation: EvaluationInterface = {
          id: '',
          themes: [],
          name: '',
          description: '',
          groupId: [],
          date: null,
          percent: 0,
        }

        var themes: string[] = [];

        for(let i=0; i<this.selectThemes.length; i++){
            
            if(this.selectThemes[i]){
              themes.push(this.themes[i].name);
            }
            
        }
        
        if(this.stepFourForm.get('group').value=="") {
          evaluation.groupId.push('General');
        } else {
          evaluation.groupId.push(this.stepFourForm.get('group').value);
        }

       evaluation.name = this.stepFourForm.get('evaluation').value;
       evaluation.date = this.stepFourForm.get('date').value;
       evaluation.percent = this.stepFourForm.get('percent').value;
       evaluation.id = md5(evaluation.name + fecha + evaluation.date);
       evaluation.themes = themes;
       this.evaluations.push(evaluation);
       
       console.log(this.evaluations);  
    }
}
