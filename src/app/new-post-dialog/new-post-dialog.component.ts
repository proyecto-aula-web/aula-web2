import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage } from 'ng2-image-compress';
import { AngularFireStorageModule, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { ImageHandlerService } from '../services/image/image-handler.service';
import { PostInterface } from '../models/post';
import { PostService } from '../services/post.service';
import { md5 } from '../md5/md5';

@Component({
  selector: 'au-new-post-dialog',
  templateUrl: './new-post-dialog.component.html',
  styleUrls: ['./new-post-dialog.component.css']
})
export class NewPostDialogComponent implements OnInit {

  // post: PostInterface;
  simpleForm: FormGroup;
  advancedForm: FormGroup;

  /** compress images */
  title = 'app';
  selectedImage: any;
  processedImages: any = [];
  // showTitle: Boolean = true;
  /** */

  /** spinner - loading */
  imageLoading: Boolean = false;
  color = 'primary';
  mode = 'indeterminate';
  diameter = 10;
  /** */

  /** AngularFire Storage */
  // // task
  // task: AngularFireUploadTask;

  // // Progress monitoring
  // percent: Observable<number>;
  // snapshot: Observable<any>;

  // // Download URL
  // downloadURL: Observable<string>;

  // progress = {
  //   color: 'primary',
  //   mode: 'determinate',
  //   // value: 0,
  // };

  private progressBarPositve = {
    color: 'primary',
    mode: 'buffer'
  };
  private progressBarNegative = {
    color: 'warn',
    mode: 'buffer'
  };

  // progress

  ListTask: UploadTask[] = [];
  ListTaskAttachment: UploadTask[] = [];

  attachmentConfig =
    '.ace, .doc, .pdf, .ppt,  .ppsx, .pps, .rar, .rtf, .xls, .zip,' +
    '.docx, .docm, .dotx, .dotm, .xlsx, .xlsm, .xltx, .xltm, .xlsb, .xlam, .pptx, .pptm, .potx, .potm, .ppam, .ppsx';
  /** */

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<NewPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private imgCompressService: ImageCompressService,
    private storage: AngularFireStorage,
    private ImageHandler: ImageHandlerService,
    private postService: PostService
    // private custonFormFiedl: MyTelInput,
  ) {}

  ngOnInit() {
    this.simpleForm = this._formBuilder.group({
      description: [''],
    });

    // this.simpleForm = this._formBuilder.group({
    //   input1: [''],
    //   input2: [''],
    //   parts: this._formBuilder.group({
    //     are: [''],
    //     exchange: [''],
    //     subscriber: ['']
    //   })
    // });

    this.advancedForm = this._formBuilder.group({
      name: ['']
    });
  }

  sumitForm() {
    console.log('data', this.data);
    let post: PostInterface;
    const date = new Date().getTime();
    const description = this.simpleForm.get('description');
    const id = md5(`${this.data.user} ${this.data.courseId} ${date}`);
    const user = this.data.user;
    // const createdDate;
    // const description;
    const media: { type: string; id?: string; downloadURL: string }[] = [];
    const attachtment: { type: string; id?: string; downloadURL: string }[] = [];
    let aux: { type: string; id?: string; downloadURL: string };

    if (this.ListTask.length > 0) {
      for (let i = 0; i < this.ListTask.length; i++) {
        const element = this.ListTask[i];
        console.log('elemenent', element, element.id, element.type);
        aux = {
          type : element.type,
          id : element.id,
          downloadURL: element.response.downloadURL
        };
        media.push(aux);
      }
    }

    if (this.ListTaskAttachment.length > 0) {
      for (let i = 0; i < this.ListTaskAttachment.length; i++) {
        const element = this.ListTaskAttachment[i];
        console.log('elemenent', element, element.id, element.type);
        aux = {
          type: element.type,
          id: element.id,
          downloadURL: element.response.downloadURL
        };
        attachtment.push(aux);
      }
    }


    post = {
      id: id,
      user: user,
      createdDate: date,
      description: description.value,
    };

    if (media.length > 0) {
      post.media = media;
    }

    if (attachtment.length > 0) {
      post.attachtment = attachtment;
    }

    if (post.description === '' && !post.media && !post.attachtment) {
      console.log('Publicacion Vacia');
      this.close(false);
      return ;
    }

    console.log('Post', post);

    this.postService.addNewPost(post);
    this.close(true);
  }

  close(response?: any) {
    if (response) {
      this.dialogRef.close(response);
    } else {
      this.dialogRef.close();
    }
  }

  onChange(fileInput: any) {
    // let fileList: FileList;
    this.imageLoading = true;
    const images: Array<IImage> = [];

    // or you can pass File[]
    const files: any = Array.from(fileInput.target.files);

    // Comprimiendo imagenes
    ImageCompressService.filesArrayToCompressedImageSource(files).then(
      observableImages => {
        observableImages.subscribe(
          image => {
            this.imageLoading = true;
            images.push(image);
          },
          error => {
            console.log('Error while converting');
          },
          () => {
            this.processedImages = images;
            this.imageLoading = false;

            for (let i = 0; i < images.length; i++) {
              const element = images[i];
              const newFile = this.ImageHandler.getAsFile(
                files[i].name,
                images[i].compressedImage.imageDataUrl
              );
              this.startUpload(newFile);
            }

            // const newFile = this.ImageHandler.getAsFile('unNmbre.jpg', images[0].compressedImage.imageDataUrl);

            // this.startUpload(newFile);
          }
        );
      }
    );
  }

  onChangeAttachment(fileInput: any) {
    const files: any = Array.from(fileInput.target.files);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // console.log(file);
      this.startUploadAttachment(file);
    }
  }
  /** AngularFire Storage */
  startUpload(file: File) {
    // The file object
    // file

    // Client-side validat0ion example
    if (file.type.split('/')[0] !== 'image') {
      console.error(`unsupportrd file type ${file.type.split('/')[0]}`);
      return;
    }

    // the storage path
    const id = md5(`${new Date().getTime()}_${file.name}`);
    const parts = file.name.split('.');
    const type = parts[parts.length - 1];
    const path = `${type}/${id}`;

    //  Totally optional metada
    const customMetadata = { name: file.name };

    // The main task
    // this.task = this.storage.upload(path, file, {customMetadata});

    // // Progress monitoring
    // this.percent = this.task.percentageChanges();
    // this.snapshot = this.task.snapshotChanges();

    // // the file's download URL
    // // this.downloadURL = this.task.getDownloadURL();
    // this.task.then(uploaded => {
    //   console.log('uploaded', uploaded);
    //   // uploaded.downloadURL
    // });
    const name = file.name;
    const task = this.storage.upload(path, file, { customMetadata });
    const percentage = task.percentageChanges();
    const snapshot = task.snapshotChanges();
    // let response;

    task.then(res => {
      // console.log('response', res);
      // response = res;
      // console.log('taskList', this.ListTask);

      for (let i = 0; i < this.ListTask.length; i++) {
        if (this.ListTask[i].name === name) {
          this.ListTask[i].response = res;

          console.log(name, this.ListTask[i]);
        }
      }
    });

    const currentTask: UploadTask = {
      id:  id,
      name: name,
      type: type,
      task: task,
      percentage: percentage,
      snapshot: snapshot,
      progressBar: this.progressBarPositve,
      response: undefined
    };

    this.ListTask.push(currentTask);
  }

  startUploadAttachment(file: File) {
    // The file object
    // file

    // Client-side validat0ion example
    // if (file.type.split("/")[0] !== "image") {
    //   console.error(`unsupportrd file type ${file.type.split("/")[0]}`);
    //   return;
    // }

    // the storage path
    const id = md5(`${new Date().getTime()}_${file.name}`);
    const parts = file.name.split('.');
    const type = parts[parts.length - 1];
    const path = `${type}/${id}`;
    //  Totally optional metada
    const customMetadata = { name: file.name };

    console.log(this.storage.ref(path));
    // console.log(this.storage.ref(path));
    const name = file.name;
    const task = this.storage.upload(path, file, { customMetadata });
    const percentage = task.percentageChanges();
    const snapshot = task.snapshotChanges();

    // const _oath
    // let response;

    task.then(res => {
      for (let i = 0; i < this.ListTaskAttachment.length; i++) {
        if (this.ListTaskAttachment[i].name === name) {
          this.ListTaskAttachment[i].response = res;

          console.log(name, this.ListTaskAttachment[i]);
          const r = this.storage.ref(this.ListTaskAttachment[i].path);
          console.log(this.ListTaskAttachment[i]);
        }
      }
    });

    const currentTask: UploadTask = {
      id: id,
      name: name,
      type: type,
      task: task,
      percentage: percentage,
      snapshot: snapshot,
      progressBar: this.progressBarPositve,
      response: undefined,
      path: path
    };

    this.ListTaskAttachment.push(currentTask);
  }

  // Determine if the upload task is actived
  isAcive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  // Cancelar carga
  deleteCancel(uploadTask) {
    console.log('uploadTask', uploadTask);
    const snapshot = uploadTask.task.snapshotChanges();

    snapshot.subscribe(snap => {
      console.log('snap', snap);
      if (this.isAcive(snap)) {
        uploadTask.progressBar = this.progressBarNegative;
        uploadTask.task.cancel();

        uploadTask.task.catch(error => {
          console.log('error', error);

          if (error.code === 'storage/canceled') {
            this.ListTask = this.ListTask.filter(task => {
              return task.name !== uploadTask.name;
            });
          }
        });
      } else {
        // eliminar archivo
        console.log('se debe eliminar');
      }
    });
  }
  /** */

}



export interface UploadTask {
  id: string;
  name: string;
  type: string;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  progressBar: {color: string, mode: string};
  response: any;

  path?: string;
}

