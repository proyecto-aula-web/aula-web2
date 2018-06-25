import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators';
import { UserInterface } from '../models/user';

// eliminar
// interface UserInterface {
//   uid: string;
//   email: string;
//   username?: string;
//   firstname?: string;
//   lastname?: string;
//   displayName?: string;
//   photoURL?: string;
//   provider?: string; /** eliminar */
// }


@Injectable()
export class AuthService {
  user: Observable<UserInterface>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<UserInterface>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }

  // registerUser(email: string, pwd: string) {
  //   return new Promise((resolve, reject) => {
  //     this.afAuth.auth
  //       .createUserWithEmailAndPassword(email, pwd)
  //       .then(userData => resolve(userData), error => reject(error));
  //   });
  // }
  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  registerUser(email: string, pwd: string, additionalUserInfo: any) {

    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .createUserWithEmailAndPassword(email, pwd)
        .then(
          (userData) => {
            this.updateUserData(
              'email',
              userData,
              additionalUserInfo
            );
            resolve(userData);
          },
          error => reject(error)
        );
    });
  }

  emailLogin(email: string, pwd: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .signInWithEmailAndPassword(email, pwd)
        .then(userData => resolve(userData), error => reject(error));
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    // return new Promise((resolve, reject) => {
    //   this.afAuth.auth
    //     .signInWithEmailAndPassword(email, pwd)
    //     .then(userData => resolve(userData), error => reject(error));
    // });
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithPopup(provider)
      .then(
        credential => {
          console.log('Credential USer', credential);
          this.updateUserData(credential.credential.providerId, credential.user, credential.additionalUserInfo.profile);
          resolve(credential);
        },
        error => reject(error));

          // this.afAuth.auth
          //   .signInWithEmailAndPassword(email, pwd)
          //   .then(userData => resolve(userData), error => reject(error));
        // });
        // return this.afAuth.auth.signInWithPopup(provider).then(credential => {
        //   console.log('Credential USer', credential);
        //   this.updateUserData(
        //     credential.credential.providerId,
        //     credential.user,
        //     credential.additionalUserInfo.profile
        //   );
    });
  }

  private updateUserData(provider: string, user: any, additionalUserInfo: any) {
    // Sets user data to firestore on login

    let data: UserInterface | null;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    if (provider === 'google.com') {
      data = {
        uid: user.uid,
        email: user.email,
        firstname: additionalUserInfo.given_name,
        lastname: additionalUserInfo.family_name,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: provider   /** eliminar */
      };
    } else if (provider === 'email') {
      data = {
        uid: user.uid,
        email: user.email,
        firstname: additionalUserInfo.firstname,
        lastname: additionalUserInfo.lastname,
        username: additionalUserInfo.username,
        displayName: additionalUserInfo.firstname + ' ' + additionalUserInfo.lastname,
        // photoURL: user.photoURL
        provider: provider   /** eliminar */
      };
    } else {
      data = null;
    }

    return userRef.set(data, { merge: true });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
