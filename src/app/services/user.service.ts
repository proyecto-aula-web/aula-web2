import { Injectable } from '@angular/core';
import { UserInterface } from '../models/user';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  userCollection: AngularFirestoreCollection<UserInterface>;
  userDoc: AngularFirestoreDocument<UserInterface>;
  users: Observable<UserInterface[]>;
  user: Observable<UserInterface>;
  _user: UserInterface;
  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection('users', res => res);
  }

  // addNewUser(user: UserInterface) {
  //   this.userCollection.add(user);
  // }

  addNewUser(user: UserInterface) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    this._user = user;
    return userRef.set(user, { merge: true });
  }

  getAllUsers(): Observable<UserInterface[]> {
    this.users = this.userCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as UserInterface;
          data.uid = action.payload.doc.id;
          return data;
        });
      })
    );

    return this.users;
  }

  getUser(iduser: string) {
    if (this.user) {
      console.log('del getUser :: esta cargado', true);
      this.user.subscribe(userData => {
        if (userData.uid === iduser) {
          this._user = userData;
          return this.user;
        }
      });
    }

    console.log('del getUser :: peticion al servidor', false);

    this.userDoc = this.afs.doc<UserInterface>(`users/${iduser}`);
    this.user = this.userDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as UserInterface;
          data.uid = action.payload.id;
          this._user = data;
          return data;
        }
      })
    );
    console.log('del this.user', this.user);
    return this.user;
  }

  getCurrentUser(): Observable<UserInterface> {
    return this.user;
  }

  getUserData(): UserInterface {
    return this._user;
  }

  clear() {
    this._user = null;
  }

  updateUser(user: UserInterface) {
    this.userDoc = this.afs.doc(`users/${user.uid}`);
    this.userDoc.update(user);
  }

  deleteUser(user: UserInterface) {
    this.userDoc = this.afs.doc(`users/${user.uid}`);
    this.userDoc.delete();
  }
}
