import { Injectable } from '@angular/core';
import { ThemeInterface } from '../models/theme';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ThemeService {
  themeCollection: AngularFirestoreCollection<ThemeInterface>;
  themeDoc: AngularFirestoreDocument<ThemeInterface>;
  // themes: Observable<ThemeInterface[]>;
  themes: any;
  themesObservables: any;
  theme: Observable<ThemeInterface>;

  currentThemeId: string;


  constructor(
    private afs: AngularFirestore
  ) {
    this.themeCollection = this.afs.collection('themes', res => res);

    this.themes = {};
    this.themesObservables = {};
  }

  // addNewTheme(theme: ThemeInterface) {
  //   this.themeCollection.add(theme);
  // }

  addNewTheme(theme: ThemeInterface) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`themes/${theme.id}`);
    return userRef.set(theme, { merge: true });
  }

  getAllThemes(): Observable<ThemeInterface[]> {
    this.themes = this.themeCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ThemeInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );

    return this.themes;
  }

  getOneTheme(idTheme: string) {
    this.themeDoc = this.afs.doc<ThemeInterface>(`themes/${idTheme}`);
    this.theme = this.themeDoc.snapshotChanges().pipe(
      map(action => {
        console.log('del themeService :: getOneTheme', action);
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as ThemeInterface;
          data.id = action.payload.id;
          this.themes[data.id] = data;
          return data;
        }
      })
    );
    this.themesObservables[idTheme] = this.theme;
    return this.theme;
  }

  getThemeData(id: string): ThemeInterface {
    // console.log("del ThemeService :: getThemeData", this.course);
    if (this.themes[id]) {
      return this.themes[id];
    } else {
      return null;
    }
  }

  getTheme(id: string): Observable<ThemeInterface> {
    // console.log("del ThemeService :: getThemeData", this.course);
    if (this.themesObservables[id]) {
      return this.themesObservables[id];
    } else {
      return null;
    }
  }
  updateTheme(theme: ThemeInterface) {
    this.themeDoc = this.afs.doc(`themes/${theme.id}`);
    this.themeDoc.update(theme);
  }

  deleteTheme(theme: ThemeInterface) {
    this.themeDoc = this.afs.doc(`themes/${theme.id}`);
    this.themeDoc.delete();
  }

  getCurrentThemeId(): string {
    return this.currentThemeId;
  }

  setCurrentThemeId(id: string): void {
    this.currentThemeId = id;
  }

  clearId(): void {
    this.currentThemeId = null;
  }
}
