import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ThemeDialogComponent } from '../theme-dialog/theme-dialog.component';
import { DeleteThemeDialogComponent } from '../delete-theme-dialog/delete-theme-dialog.component';
import { ThemeService } from '../services/theme.service';
import { ThemeInterface } from '../models/theme';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'au-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.css']
})

export class NewThemeComponent implements OnInit {

  name: string;
  public themes: ThemeInterface[];


  constructor(
  		public dialog: MatDialog,
      private themeService: ThemeService,
  	) { }

  	ngOnInit() {
      this.getThemes();
  	}

  openDialog(){

  	const dialogConfig = new MatDialogConfig();

  	dialogConfig.disableClose = true;
  	dialogConfig.autoFocus = true;
  	dialogConfig.data = {id: null};
  	this.dialog.open(ThemeDialogComponent, dialogConfig);

  }

  openDialogEdit(idTheme: string){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {id: idTheme};
    this.dialog.open(ThemeDialogComponent, dialogConfig);

  }

  openDialogDelete(idTheme: string){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {id: idTheme};
    this.dialog.open(DeleteThemeDialogComponent, dialogConfig);
  }

  getThemes(){
    this.themeService.getAllThemes().subscribe(themes => this.themes = themes);
    console.log(this.themes);
  }

  addSubtheme(theme: ThemeInterface){

  }
}
