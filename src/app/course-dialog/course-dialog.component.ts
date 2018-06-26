import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { UserService } from '../services/user.service';
import { ThemeService } from '../services/theme.service';
import { CourseService } from '../services/course.service';
import { GroupService } from '../services/group.service';
import { InstitutionService } from '../services/institution.service';
import { EvaluationService } from '../services/evaluation.service';

import { ThemeInterface } from '../models/theme';
import { CourseInterface } from '../models/course';
import { InstitutionInterface } from '../models/institution';
import { UserInterface } from '../models/user';
import { GroupInterface } from '../models/group';
import { EvaluationInterface } from '../models/evaluation';
import { DayInterface } from '../models/day';
import { HorarioInterface } from '../models/horario';

import { md5 } from '../md5/md5';
import { AuthService } from '../core/auth.service';


import { Router } from '@angular/router';


@Component({
  selector: 'au-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {


  userData: UserInterface;
  isLinear = false;
  public email_father: string;
  public themes: ThemeInterface[] = [];
  public instructors: UserInterface[] = [];
  public students: UserInterface[] = [];
  public enteros: Number[];
  public groups: GroupInterface[] = [];
  public evaluations: EvaluationInterface[] = [];
  public lunes = false;
  public martes = false;
  public miercoles = false;
  public jueves = false;
  public viernes = false;
  public sabado = false;
  public domingo = false;
  public nameTheme: any = null;


  public course: CourseInterface = {
    id: '',
    name: '',
    code: '',
    email_owner: '',
    instructors: [],
    institution: null,
    groups: [],
    themes: [],
    lastUpdate: null,

  };

  public institution: InstitutionInterface = {
    id: '',
    name: '',
  };

  public horarios: HorarioInterface[] = [];



  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  stepOneForm: FormGroup;
  stepTwoForm: FormGroup;
  stepThreeForm: FormGroup;
  stepFourForm: FormGroup;
  stepFiveForm: FormGroup;

  print: Object = {
    name: 'Nombre curso',
    code: 'Código',
    institution: 'Institución',
    next: 'Siguiente',
    required: 'Requerido',
    min: 'Caracteres minimos',
    curso: 'Curso',
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
    private _UserService: UserService,
    private courseService: CourseService,
    private themeService: ThemeService,
    private groupService: GroupService,
    private instituionsService: InstitutionService,
    private evaluationService: EvaluationService,
    public authService: AuthService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.userData = this._UserService.getUserData();
    }

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
      institution: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45), Validators.pattern(/^[a-zA-Z\s]/)]],
    });

    this.stepTwoForm = this._formBuilder.group({
      name: ['', [Validators.minLength(4), Validators.maxLength(45), Validators.pattern(/^[0-9a-zA-Z\s]+$/)]]
    });

    this.stepThreeForm = this._formBuilder.group({
      email: ['', [Validators.minLength(4), Validators.maxLength(45), Validators.pattern(/^[0-9a-zA-Z\s]+$/)]],
      students: ['', [Validators.minLength(4), Validators.maxLength(200)]],
      group: ['', [Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[0-9a-zA-Z\s]+$/)]]
    });

    this.stepFourForm = this._formBuilder.group({
      evaluation: ['', [Validators.minLength(4), Validators.maxLength(45), Validators.pattern(/^[0-9a-zA-Z\s]+$/)]],
      group: '',
      date: ['', []],
      percent: '',
    });

    this.stepFiveForm = this._formBuilder.group({
      date_ini: null,
      date_cul: null,
      group: '',
      lun_hour_ini: '',
      lun_hour_cul: '',
      mar_hour_ini: '',
      mar_hour_cul: '',
      mie_hour_ini: '',
      mie_hour_cul: '',
      jue_hour_ini: '',
      jue_hour_cul: '',
      vie_hour_ini: '',
      vie_hour_cul: '',
      sab_hour_ini: '',
      sab_hour_cul: '',
      dom_hour_ini: '',
      dom_hour_cul: '',

    });

    // this.getThemeDatas();
  }

  close() {
    this.dialogRef.close();
  }

  getThemeDatas() {
    this.themeService.getAllThemes().subscribe(themes => this.themes = themes);
    console.log(this.themes);
  }

  onClickNextOne() {

    const fecha = new Date();
    this.course.id = md5(this.stepOneForm.get('name').value + fecha);
    this.course.name = this.stepOneForm.get('name').value;
    this.course.code = this.stepOneForm.get('code').value;
    this.institution.id = md5(this.stepOneForm.get('institution').value + fecha);
    this.institution.name = this.stepOneForm.get('institution').value;
    this.course.institution = this.institution;
    this.course.email_owner = this.email_father;

    console.log('Course Interface:' + this.course.name + '|' + this.course.institution.name);
  }


  onClickNextTwo() {
    console.log('Theme Interface:' + this.stepTwoForm.get('name').value);
  }

  addTheme() {

    const fecha = new Date();
    const auxTheme: ThemeInterface = {
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

    this.stepTwoForm.setValue({
      name: '',
    });

    console.log(this.themes);
    console.log(this.selectThemes);
  }

  onDeleteTheme(themeId: string, index: number) {
    this.themes = this.themes.filter(theme => theme.id !== themeId);
    this.selectThemes.splice(index, 1);
    console.log(this.themes);
  }

  addInstructor() {
    const fecha = new Date();

    const auxInstructor: UserInterface = {
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
    console.log('del courseDialog :: addInstructor', this.instructors);

    this.stepThreeForm.setValue({
      email: '',
      students: '',
      group: '',
    });

  }

  onDeleteInstructor(instructorEmail: string) {
    this.instructors = this.instructors.filter(instructor => instructor.email !== instructorEmail);
    console.log(this.instructors);
  }

  addGroup() {

    const fecha = new Date();

    const group: GroupInterface = {
      id: '',
      id_course: '',
      name: '',
      stundents: [],
      date_ini: '',
      date_cul: '',
      schedule: [],
      evaluations: [],
    };

    let auxStudents: string[] = [];
    let encontre = false;
    let index = 0;

    if (this.stepThreeForm.get('students').value !== null) {
      auxStudents = this.stepThreeForm.get('students').value.split(/\n/g);
    }



    if (this.groups.length !== 0) {

      for (let i = 0; i < this.groups.length; i++) {

        if (this.groups[i].name === this.stepThreeForm.get('group').value) {
          encontre = true;
          index = i;
          break;
        }
      }

      if (encontre) {
        this.groups[index].stundents = auxStudents;
      } else {
        group.name = this.stepThreeForm.get('group').value;
        group.stundents = auxStudents;
        group.id_course = this.course.id;
        group.id = md5(group.id_course + group.name + fecha);
        this.groups.push(group);
      }
    } else {
      group.name = this.stepThreeForm.get('group').value;
      group.stundents = auxStudents;
      group.id_course = this.course.id;
      group.id = md5(group.id_course + group.name + fecha);
      this.groups.push(group);
    }

    this.stepThreeForm.setValue({
      email: '',
      students: '',
      group: '',
    });

    console.log(this.groups);
  }

  onDeleteGroup(groupId: string, name: string) {
    this.groups = this.groups.filter(group => group.id !== groupId);
    console.log(this.groups);
  }

  verifyGroups() {
    if (this.groups.length === 0) {

      const fecha = new Date();
      const group: GroupInterface = {
        id: '',
        id_course: '',
        name: '',
        stundents: [],
        date_ini: '',
        date_cul: '',
        schedule: [],
        evaluations: [],
      };

      group.name = 'General';
      group.id_course = this.course.id;
      group.id = md5(group.id_course + group.name + fecha);
      this.groups.push(group);


    }

    console.log(this.groups);
  }

  addEvaluation() {
    console.log(this.selectThemes);

    const fecha = new Date();


    const evaluation: EvaluationInterface = {
      id: '',
      themes: [],
      name: '',
      description: '',
      groupId: '',
      date: null,
      percent: 0,
    };

    const themes: string[] = [];
    let name_group = '';
    let index = 0;

    for (let i = 0; i < this.selectThemes.length; i++) {

      if (this.selectThemes[i]) {
        themes.push(this.themes[i].name);
      }

    }

    name_group = this.stepFourForm.get('group').value;

    if (name_group === '') {
      name_group = 'General';
    }

    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].name === name_group) {
        index = i;
        break;
      }
    }

    evaluation.groupId = this.groups[index].id;
    evaluation.name = this.stepFourForm.get('evaluation').value;
    evaluation.date = this.stepFourForm.get('date').value;
    evaluation.percent = this.stepFourForm.get('percent').value;
    evaluation.id = md5(evaluation.name + fecha + evaluation.date);
    evaluation.themes = themes;
    this.evaluations.push(evaluation);

    console.log(this.evaluations);

    this.stepFourForm.setValue({
      evaluation: '',
      group: '',
      date: '',
      percent: '',
    });
  }

  deleteEvaluation(evaluationId: string) {
    this.evaluations = this.evaluations.filter(evaluation => evaluation.id !== evaluationId);
  }

  addHorario() {

    let name_group: string;
    let index = 0;
    const days: DayInterface[] = [];

    if (this.stepFiveForm.get('group').value === '') {
      name_group = 'General';
    } else {
      name_group = this.stepFiveForm.get('group').value;
    }

    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].name === name_group) {
        index = i;
        break;
      }
    }

    this.groups[index].date_ini = this.stepFiveForm.get('date_ini').value;
    this.groups[index].date_cul = this.stepFiveForm.get('date_cul').value;


    if (this.lunes) {

      const day_lun: DayInterface = {
        day: 'lunes',
        duration: null,
      };

      const duration_lun = {
        InitHour: '',
        FinishHour: ''
      };

      duration_lun.InitHour = this.stepFiveForm.get('lun_hour_ini').value;
      duration_lun.FinishHour = this.stepFiveForm.get('lun_hour_cul').value;
      day_lun.duration = duration_lun;
      days.push(day_lun);
    }

    if (this.martes) {

      const day_mar: DayInterface = {
        day: 'martes',
        duration: null,
      };

      const duration_mar = {
        InitHour: '',
        FinishHour: ''
      };

      duration_mar.InitHour = this.stepFiveForm.get('mar_hour_ini').value;
      duration_mar.FinishHour = this.stepFiveForm.get('mar_hour_cul').value;
      day_mar.duration = duration_mar;
      days.push(day_mar);
    }

    if (this.miercoles) {

      const day_mie: DayInterface = {
        day: 'miercoles',
        duration: null,
      };

      const duration_mie = {
        InitHour: '',
        FinishHour: ''
      };

      duration_mie.InitHour = this.stepFiveForm.get('mie_hour_ini').value;
      duration_mie.FinishHour = this.stepFiveForm.get('mie_hour_cul').value;
      day_mie.duration = duration_mie;
      days.push(day_mie);
    }

    if (this.jueves) {

      const day_jue: DayInterface = {
        day: 'jueves',
        duration: null,
      };

      const duration_jue = {
        InitHour: '',
        FinishHour: ''
      };

      duration_jue.InitHour = this.stepFiveForm.get('jue_hour_ini').value;
      duration_jue.FinishHour = this.stepFiveForm.get('jue_hour_cul').value;
      day_jue.duration = duration_jue;
      days.push(day_jue);
    }

    if (this.viernes) {

      const day_vie: DayInterface = {
        day: 'viernes',
        duration: null,
      };

      const duration_vie = {
        InitHour: '',
        FinishHour: ''
      };

      duration_vie.InitHour = this.stepFiveForm.get('vie_hour_ini').value;
      duration_vie.FinishHour = this.stepFiveForm.get('vie_hour_cul').value;
      day_vie.duration = duration_vie;
      days.push(day_vie);
    }

    if (this.sabado) {

      const day_sab: DayInterface = {
        day: 'sabado',
        duration: null,
      };

      const duration_sab = {
        InitHour: '',
        FinishHour: ''
      };

      duration_sab.InitHour = this.stepFiveForm.get('sab_hour_ini').value;
      duration_sab.FinishHour = this.stepFiveForm.get('sab_hour_cul').value;
      day_sab.duration = duration_sab;
      days.push(day_sab);
    }

    if (this.domingo) {

      const day_dom: DayInterface = {
        day: 'domingo',
        duration: null,
      };

      const duration_dom = {
        InitHour: '',
        FinishHour: ''
      };

      duration_dom.InitHour = this.stepFiveForm.get('dom_hour_ini').value;
      duration_dom.FinishHour = this.stepFiveForm.get('dom_hour_cul').value;
      day_dom.duration = duration_dom;
      days.push(day_dom);
    }


    console.log(days);
    this.groups[index].schedule = days;

    const horario: HorarioInterface = {
      id_group: '',
      name_group: '',
      days: []
    };

    horario.id_group = this.groups[index].id;
    horario.name_group = this.groups[index].name;
    horario.days = days;

    if (this.horarios.length === 0) {
      this.horarios.push(horario);
    } else {

      let encontre = false;
      let pos = 0;

      for (let i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i].id_group === this.groups[index].id) {
          encontre = true;
          pos = i;
          break;
        }
      }

      if (encontre) {
        this.horarios[pos].days = days;
        console.log('Encontre el beta');
      } else {
        this.horarios.push(horario);
        console.log('NO Encontre el beta');
      }
    }



    console.log('Hora del lunes:' + this.stepFiveForm.get('lun_hour_ini').value);
    console.log(this.groups);
    console.log('Horarios');
    console.log(this.horarios);


  }

  deleteHorario(id: string) {
    const index = 0;
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id === id) {
        this.groups[i].schedule.splice(0, this.groups[i].schedule.length);
        break;
      }

    }


    for (let i = 0; i < this.horarios.length; i++) {
      if (this.horarios[i].id_group === id) {
        this.horarios.splice(i, 1);
        break;
      }
    }


    console.log(this.groups);
    console.log(this.horarios);
  }

  onDone() {

    if (this.themes.length !== 0) {
      let onetheme;
      for (let i = 0; i < this.themes.length; i++) {
        onetheme = {
          id: this.themes[i].id,
          name: this.themes[i].name
        };
        // this.course.themes.push(this.themes[i].id);
        this.course.themes.push(onetheme);
        this.themeService.addNewTheme(this.themes[i]);
      }
    }

    this.course.instructors.push(this.userData.username);
    if (this.instructors.length !== 0) {
      for (let i = 0; i < this.instructors.length; i++) {
        this.course.instructors.push(this.instructors[i].email);
      }
    }

    console.log('del CourseDialog instructores', this.instructors);
    console.log('del CourseDialog  course instructores' , this.course );

    if (this.groups.length !== 0) {


      if (this.evaluations.length !== 0) {

        for (let i = 0; i < this.groups.length; i++) {
          for (let j = 0; j < this.evaluations.length; j++) {
            if (this.groups[i].id === this.evaluations[j].groupId) {
              this.groups[i].evaluations.push(this.evaluations[j]);
              this.evaluationService.addNewEvaluation(this.evaluations[j]);

            }
          }
        }

      }
      for (let i = 0; i < this.groups.length; i++) {
        this.course.groups.push(this.groups[i].id);
        this.groupService.addNewGroup(this.groups[i]);
      }
    }
    const fecha = new Date();

    this.course.lastUpdate = fecha;
    this.courseService.addNewCourse(this.course);
    this.instituionsService.addNewInstitution(this.institution);

    /** Actualizando el Usuario Creador del curso */
    this.userData.id_course.unshift(this.course.id);
    this._UserService.updateUser(this.userData);

    this.dialogRef.close();
  }
}
