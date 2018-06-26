import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { trigger } from '@angular/animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NotificationInterface } from '../models/notification';
import { ArrayNotificationInterface } from '../models/notification';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationCollection: AngularFirestoreCollection<ArrayNotificationInterface>;
  notificationDoc: AngularFirestoreDocument<ArrayNotificationInterface>;
  // notifications: Observable<ArrayNotificationInterface[]>;
  notificationsObservables: any;
  notifications: any;
  notification: Observable<ArrayNotificationInterface>;

  currentNotificationId: string;

  constructor(private afs: AngularFirestore) {
    this.notificationCollection = this.afs.collection('notifications', ref => ref);

    this.notificationsObservables = {};
    this.notifications = {};
  }

  addNewNotification(notification: ArrayNotificationInterface) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `notifications/${notification.id}`
    );
    return userRef.set(notification, { merge: true });
  }

  getOneNotification(idNotification: string) {
    this.notificationDoc = this.afs.doc<ArrayNotificationInterface>(
      `notifications/${idNotification}`
    );
    this.notification = this.notificationDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as ArrayNotificationInterface;
          data.id = action.payload.id;
          this.notifications[data.id] = data;
          return data;
        }
      })
    );

    this.notificationsObservables[idNotification] = this.notification;
    return this.notification;
  }

  getNotificationData(id: string): ArrayNotificationInterface {
    console.log('del NotificationService :: getNotificationData', this.notification);
    if (this.notifications[id]) {
      return this.notifications[id];
    } else {
      return null;
    }
  }

  getNotification(id: string): Observable<ArrayNotificationInterface> {
    if (this.notificationsObservables[id]) {
      return this.notificationsObservables[id];
    } else {
      return null;
    }
  }

  updateNotification(notification: ArrayNotificationInterface) {
    this.notificationDoc = this.afs.doc(`notifications/${notification.id}`);
    this.notificationDoc.update(notification);
  }

  deleteNotification(notification: ArrayNotificationInterface) {
    this.notificationDoc = this.afs.doc(`notifications/${notification.id}`);
    this.notificationDoc.delete();
  }

  getCurrentNotificationId(): string {
    console.log(
      'del NotificationService :: getCurrentNotificationId',
      this.currentNotificationId
    );
    return this.currentNotificationId;
  }

  setCurrentNotificationId(id: string): void {
    this.currentNotificationId = id;
  }
}
