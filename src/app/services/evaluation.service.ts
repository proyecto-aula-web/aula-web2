import { Injectable } from '@angular/core';
import { EvaluationInterface } from '../models/evaluation';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EvaluationService {
  evaluationCollection: AngularFirestoreCollection<EvaluationInterface>;
  evaluationDoc: AngularFirestoreDocument<EvaluationInterface>;
  evaluations: Observable<EvaluationInterface[]>;
  evaluation: Observable<EvaluationInterface>;

  constructor(private afs: AngularFirestore) {
    this.evaluationCollection = this.afs.collection('evaluations', res => res);
  }

  // addNewEvaluation(evaluation: EvaluationInterface) {
  //   this.evaluationCollection.add(evaluation);
  // }
  addNewEvaluation(evaluation: EvaluationInterface) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`evaluations/${evaluation.id}`);
    return userRef.set(evaluation, { merge: true });
  }

  getAllEvaluations(): Observable<EvaluationInterface[]> {
    this.evaluations = this.evaluationCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as EvaluationInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );

    return this.evaluations;
  }

  getOneEvaluation(idevaluation: string) {
    this.evaluationDoc = this.afs.doc<EvaluationInterface>(
      `evaluations/${idevaluation}`
    );
    this.evaluation = this.evaluationDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as EvaluationInterface;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.evaluation;
  }

  updateEvaluation(evaluation: EvaluationInterface) {
    this.evaluationDoc = this.afs.doc(`evaluations/${evaluation.id}`);
    this.evaluationDoc.update(evaluation);
  }

  deleteEvaluation(evaluation: EvaluationInterface) {
    this.evaluationDoc = this.afs.doc(`evaluations/${evaluation.id}`);
    this.evaluationDoc.delete();
  }
}
