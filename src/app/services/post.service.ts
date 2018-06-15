import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostInterface } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // postCollection: AngularFirestoreCollection<PostInterface>;
  postDoc: AngularFirestoreDocument<PostInterface>;
  posts: Observable<PostInterface[]>;
  post: Observable<PostInterface>;

  constructor(private afs: AngularFirestore) {
    // this.postCollection = this.afs.collection('posts', ref => ref);
  }

  addNewPost(post: PostInterface) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `posts/${post.id}`
    );
    return userRef.set(post, { merge: true });
  }

  deletePost(post: PostInterface) {
    this.postDoc = this.afs.doc(`posts/${post.id}`);
    this.postDoc.delete();
  }

  updataPost(post: PostInterface) {
    this.addNewPost(post);
  }
}
