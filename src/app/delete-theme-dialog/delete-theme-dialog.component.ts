import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { ThemeInterface } from '../models/theme';
import { Post } from "../class/post";
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'au-delete-theme-dialog',
  templateUrl: './delete-theme-dialog.component.html',
  styleUrls: ['./delete-theme-dialog.component.css']
})
export class DeleteThemeDialogComponent implements OnInit {

	public theme: ThemeInterface = {
		id: '',
  		id_course: '',
  		name: '',
 		description: '',
  		subthemes: [],
  		posts: [],
	};
  
	 idTheme: string;
   name : string;

  constructor(
        private dialogRef: MatDialogRef<DeleteThemeDialogComponent>,
        private themeService: ThemeService,
        @Inject(MAT_DIALOG_DATA) public data) {
    }

  ngOnInit() {
  	
       this.idTheme = this.data.id;
       this.getThemeData();
       this.name = this.theme.name;
     
    }

  deleteTheme() {
  	this.themeService.deleteTheme(this.theme);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  getThemeData(){
      this.themeService.getOneTheme(this.idTheme).subscribe(theme => this.theme = theme);
   }

}
