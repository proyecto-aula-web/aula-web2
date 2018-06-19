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

  constructor(private afs: AngularFirestore) {
  	this.userCollection = this.afs.collection('users', res => res);
   }

  addNewUser(user: UserInterface){
  	this.userCollection.add(user);
  }

  getAllUsers(): Observable<UserInterface[]>{
  	this.users = this.userCollection.snapshotChanges().pipe(
  	map(changes => {
  		return changes.map(action =>{
  			const data = action.payload.doc.data() as UserInterface;
  			data.uid = action.payload.doc.id;
  			return data;
  		});
  	}));

  	return this.users;
  }

  getOneUser(iduser: string){
  	this.userDoc = this.afs.doc<UserInterface>(`users/${iduser}`);
  	this.user = this.userDoc.snapshotChanges().pipe(map(action => {
  		if(action.payload.exists == false){
  			return null;
  		}else{
  			const data = action.payload.data() as UserInterface;
  			data.uid = action.payload.id;
  			return data;
  		}
  	}));
  	return this.user;
  }

  updateUser(user: UserInterface){
  	this.userDoc = this.afs.doc(`users/${user.uid}`);
  	this.userDoc.update(user);
  }
  
  deleteUser(user: UserInterface){
  	this.userDoc = this.afs.doc(`users/${user.uid}`);
  	this.userDoc.delete();
  }
}
