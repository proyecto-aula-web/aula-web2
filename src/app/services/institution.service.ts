import { Injectable } from '@angular/core';
import { InstitutionInterface } from '../models/institution';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class InstitutionService {

  institutionCollection: AngularFirestoreCollection<InstitutionInterface>;
  institutionDoc: AngularFirestoreDocument<InstitutionInterface>;
  institutions: Observable<InstitutionInterface[]>;
  institution: Observable<InstitutionInterface>;

  constructor(private afs: AngularFirestore) {
  	this.institutionCollection = this.afs.collection('institutions', res => res);
   }

  addNewInstitution(institution: InstitutionInterface){
  	this.institutionCollection.add(institution);
  }

  getAllInstitutions(): Observable<InstitutionInterface[]>{
  	this.institutions = this.institutionCollection.snapshotChanges().pipe(
  	map(changes => {
  		return changes.map(action =>{
  			const data = action.payload.doc.data() as InstitutionInterface;
  			data.id = action.payload.doc.id;
  			return data;
  		});
  	}));

  	return this.institutions;
  }

  getOneInstitution(idinstitution: string){
  	this.institutionDoc = this.afs.doc<InstitutionInterface>(`institutions/${idinstitution}`);
  	this.institution = this.institutionDoc.snapshotChanges().pipe(map(action => {
  		if(action.payload.exists == false){
  			return null;
  		}else{
  			const data = action.payload.data() as InstitutionInterface;
  			data.id = action.payload.id;
  			return data;
  		}
  	}));
  	return this.institution;
  }

  updateInstitution(institution: InstitutionInterface){
  	this.institutionDoc = this.afs.doc(`institutions/${institution.id}`);
  	this.institutionDoc.update(institution);
  }
  
  deleteInstitution(institution: InstitutionInterface){
  	this.institutionDoc = this.afs.doc(`institutions/${institution.id}`);
  	this.institutionDoc.delete();
  }
}
