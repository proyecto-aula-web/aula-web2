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
    console.log('Post Interface', post);
    return userRef.set(Object.assign({}, post), { merge: true });
  }

  deletePost(post: PostInterface) {
    this.postDoc = this.afs.doc(`posts/${post.id}`);
    this.postDoc.delete();
  }

  updataPost(post: PostInterface) {
    this.addNewPost(post);
  }

  getPost(idPost: string) {
    this.postDoc = this.afs.doc<PostInterface>(`posts/${idPost}`);
    this.post = this.postDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as PostInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
    return this.post;
  }
}
