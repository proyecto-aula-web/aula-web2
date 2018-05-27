import { Injectable } from '@angular/core';
import { ThemeInterface } from '../models/theme';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ThemeService {

  themeCollection: AngularFirestoreCollection<ThemeInterface>;
  themeDoc: AngularFirestoreDocument<ThemeInterface>;
  themes: Observable<ThemeInterface[]>;
  theme: Observable<ThemeInterface>;

  constructor(private afs: AngularFirestore) {
  	this.themeCollection = this.afs.collection('themes', res => res);
   }

  addNewTheme(theme: ThemeInterface){
  	this.themeCollection.add(theme);
  }

  getAllThemes(): Observable<ThemeInterface[]>{
  	this.themes = this.themeCollection.snapshotChanges().pipe(
  	map(changes => {
  		return changes.map(action =>{
  			const data = action.payload.doc.data() as ThemeInterface;
  			data.id = action.payload.doc.id;
  			return data;
  		});
  	}));

  	return this.themes;
  }

  getOneTheme(idTheme: string){
  	this.themeDoc = this.afs.doc<ThemeInterface>(`themes/${idTheme}`);
  	this.theme = this.themeDoc.snapshotChanges().pipe(map(action => {
  		if(action.payload.exists == false){
  			return null;
  		}else{
  			const data = action.payload.data() as ThemeInterface;
  			data.id = action.payload.id;
  			return data;
  		}
  	}));
  	return this.theme;
  }

  updateTheme(theme: ThemeInterface){
  	this.themeDoc = this.afs.doc(`themes/${theme.id}`);
  	this.themeDoc.update(theme);
  }
  
  deleteTheme(theme: ThemeInterface){
  	this.themeDoc = this.afs.doc(`themes/${theme.id}`);
  	this.themeDoc.delete();
  }
}
