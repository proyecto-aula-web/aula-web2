import { Component, OnInit , Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormBuilder, FormGroup} from '@angular/forms';
import { ThemeInterface } from '../models/theme';
import {md5} from '../md5/md5';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'au-theme-dialog',
  templateUrl: './theme-dialog.component.html',
  styleUrls: ['./theme-dialog.component.css']
})
export class ThemeDialogComponent implements OnInit {

	public theme: ThemeInterface = {
		id: '',
  		id_course: '',
  		name: '',
 		description: '',
  		subthemes: [],
  		posts: [],
	};

    form: FormGroup;
    idTheme: string;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ThemeDialogComponent>,
        private themeService: ThemeService,
        @Inject(MAT_DIALOG_DATA) public data) {
    }

    ngOnInit() {
      
      if(this.data.id){
       this.idTheme = this.data.id;
       this.getTheme(); 
       console.log("Entre");
      }else{
        console.log("No Entre");
      }
    }

    close() {
        this.dialogRef.close();
    }

    getTheme(){
      this.themeService.getOneTheme(this.idTheme).subscribe(theme => this.theme = theme);
    }

    onSubmitTheme({value}: {value: ThemeInterface}){
        value.id = md5(value.name);
        value.id_course = md5('course1');
        console.log(value)
        this.themeService.addNewTheme(value);
    }

    onEditTheme({value}: {value: ThemeInterface}){
        value.id = this.theme.id;
        this.themeService.updateTheme(value);
        console.log(value);
    } 
}
