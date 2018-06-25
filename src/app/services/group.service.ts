import { Injectable } from '@angular/core';
import { GroupInterface } from '../models/group';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GroupService {
  groupCollection: AngularFirestoreCollection<GroupInterface>;
  groupDoc: AngularFirestoreDocument<GroupInterface>;
  groups: Observable<GroupInterface[]>;
  group: Observable<GroupInterface>;

  constructor(private afs: AngularFirestore) {
    this.groupCollection = this.afs.collection('groups', res => res);
  }

  // addNewGroup(group: GroupInterface) {
  //   this.groupCollection.add(group);
  // }
  addNewGroup(group: GroupInterface) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`groups/${group.id}`);
    return userRef.set(group, { merge: true });
  }

  getAllgroups(): Observable<GroupInterface[]> {
    this.groups = this.groupCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as GroupInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );

    return this.groups;
  }

  getOnegroup(idgroup: string) {
    this.groupDoc = this.afs.doc<GroupInterface>(`groups/${idgroup}`);
    this.group = this.groupDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as GroupInterface;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.group;
  }

  updategroup(group: GroupInterface) {
    this.groupDoc = this.afs.doc(`groups/${group.id}`);
    this.groupDoc.update(group);
  }

  deletegroup(group: GroupInterface) {
    this.groupDoc = this.afs.doc(`groups/${group.id}`);
    this.groupDoc.delete();
  }
}

