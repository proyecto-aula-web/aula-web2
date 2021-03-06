import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CourseInterface } from '../models/course';
import { trigger } from '@angular/animations';

@Injectable()
export class CourseService {
  courseCollection: AngularFirestoreCollection<CourseInterface>;
  courseDoc: AngularFirestoreDocument<CourseInterface>;
  // courses: Observable<CourseInterface[]>;
  coursesObservables: any;
  courses: any;
  course: Observable<CourseInterface>;

  currentCourseId: string;

  constructor(private afs: AngularFirestore) {
    this.courseCollection = this.afs.collection('courses', ref => ref);

    this.coursesObservables = {};
    this.courses = {};
  }

  // addNewCourse(course: CourseInterface) {
  //   this.courseCollection.add(course);
  // }

  // addNewCourse2(course: CourseInterface) {
  addNewCourse(course: CourseInterface) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `courses/${course.id}`
    );
    return userRef.set(course, { merge: true });
  }

  // getAllCourses(): Observable<CourseInterface[]> {
  //   this.courses = this.courseCollection.snapshotChanges().pipe(map(changes => {
  //     return changes.map(action => {
  //       const data = action.payload.doc.data() as CourseInterface;
  //       data.id = action.payload.doc.id;
  //       return data;
  //     });
  //   }));

  //   return this.courses;
  // }
  getOneCourse(idCourse: string) {
    this.courseDoc = this.afs.doc<CourseInterface>(`courses/${idCourse}`);
    this.course = this.courseDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as CourseInterface;
          data.id = action.payload.id;
          this.courses[data.id] = data;
          return data;
        }
      })
    );

    this.coursesObservables[idCourse] = this.course;
    return this.course;
  }

  getCourseData(id: string): CourseInterface {
    console.log('del CourseService :: getCourseData', this.course);
    if (this.courses[id]) {
      return this.courses[id];
    } else {
      return null;
    }
  }

  getCourse(id: string): Observable<CourseInterface> {
    if (this.coursesObservables[id]) {
      return this.coursesObservables[id];
    } else {
      return null;
    }
  }

  updateCourse(course: CourseInterface) {
    this.courseDoc = this.afs.doc(`courses/${course.id}`);
    this.courseDoc.update(course);
  }

  deleteCourse(course: CourseInterface) {
    this.courseDoc = this.afs.doc(`courses/${course.id}`);
    this.courseDoc.delete();
  }

  // private updateUserData(provider: string, user: any, additionalUserInfo: any) {
  //   // Sets user data to firestore on login
  //   let data: User | null;
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  //   data = {
  //     uid: user.uid,
  //     email: user.email,
  //     firstname: additionalUserInfo.given_name,
  //     lastname: additionalUserInfo.family_name,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     provider: provider /** eliminar */
  //   };
  //   return userRef.set(data, { merge: true });
  // }

  getCurrentCourseId(): string {
    console.log('del CourseService :: getCurrentCourseId', this.currentCourseId);
    return this.currentCourseId;
  }

  setCurrentCourseId(id: string): void {
    this.currentCourseId = id;
  }
}
