import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage } from 'ng2-image-compress';
import { AngularFireStorageModule, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { ImageHandlerService } from '../services/image/image-handler.service';
import { PostService } from '../services/post.service';
import { CourseService } from '../services/course.service';
import { ThemeService } from '../services/theme.service';

import { PostInterface, PostMediaInterface, PostAttachmentInterface } from '../models/post';
import { CourseInterface } from '../models/course';
import { ThemeInterface } from '../models/theme';

import { md5 } from '../md5/md5';
import { FileTypeService } from '../services/file-type.service';

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

  course: CourseInterface;
  theme: ThemeInterface;

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<NewPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private imgCompressService: ImageCompressService,
    private storage: AngularFireStorage,
    private ImageHandler: ImageHandlerService,
    private postService: PostService,
    private _CourseService: CourseService,
    private _ThemeService: ThemeService,
    private _FileTypeService: FileTypeService
  ) {
    this.course = this._CourseService.getCourseData(this.data.courseId);

    if (this.data.themeId !== undefined && this.data.themeId !== null) {
      this.theme = this._ThemeService.getThemeData(this.data.themeId);
    }
  }

  ngOnInit() {
    this.simpleForm = this._formBuilder.group({
      description: ['']
    });

    this.advancedForm = this._formBuilder.group({
      name: ['']
    });
  }

  sumitForm() {
    console.log('data', this.data);
    let post: PostInterface;
    const date = new Date().getTime();
    const description = this.simpleForm.get('description');
    const id = md5(`${this.data.courseId} ${this.data.user} ${date}`);
    const user = this.data.user;
    const media: PostMediaInterface[] = [];
    const attachtment: PostAttachmentInterface[] = [];
    let aux: PostMediaInterface;
    let aux2: PostAttachmentInterface;

    if (this.ListTask.length > 0) {
      for (let i = 0; i < this.ListTask.length; i++) {
        const element = this.ListTask[i];
        aux = {
          type: element.type,
          id: element.id,
          downloadURL: element.response.downloadURL
        };
        media.push(aux);
      }
    }

    if (this.ListTaskAttachment.length > 0) {
      for (let i = 0; i < this.ListTaskAttachment.length; i++) {
        const element = this.ListTaskAttachment[i];
        aux2 = {
          type: element.type,
          id: element.id,
          name: element.name,
          downloadURL: element.response.downloadURL
        };
        attachtment.push(aux2);
      }
    }

    post = {
      id: id,
      user: user,
      createdDate: date,
      description: description.value
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
      return;
    }

    console.log('Post', post);

    this.postService.addNewPost(post);
    if (this.data.themeId !== undefined && this.data.themeId !== null) {
      if (this.theme.posts !== undefined && this.theme.posts !== null) {
        this.theme.posts.unshift(post.id);
      } else {
        this.theme.posts = [];
        this.theme.posts.push(post.id);
      }

      this._ThemeService.updateTheme(this.theme);
    } else {
      if (this.course.posts !== undefined && this.course.posts !== null) {
        this.course.posts.unshift(post.id);
      } else {
        this.course.posts = [];
        this.course.posts.push(post.id);
      }
      this._CourseService.updateCourse(this.course);
    }
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

    const name = file.name;
    const task = this.storage.upload(path, file, { customMetadata });
    const percentage = task.percentageChanges();
    const snapshot = task.snapshotChanges();
    // let response;

    task.then(res => {
      for (let i = 0; i < this.ListTask.length; i++) {
        if (this.ListTask[i].name === name) {
          this.ListTask[i].response = res;

          console.log(name, this.ListTask[i]);
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
      response: undefined
    };

    this.ListTask.push(currentTask);
  }

  startUploadAttachment(file: File) {
    // The file object
    // file

    // the storage path
    const id = md5(`${new Date().getTime()}_${file.name}`);
    const parts = file.name.split('.');
    const type = parts[parts.length - 1];
    const path = `${type}/${id}`;

    //  Totally optional metada
    const customMetadata = { name: file.name };

    console.log(this.storage.ref(path));
    const name = file.name;
    const task = this.storage.upload(path, file, { customMetadata });
    const percentage = task.percentageChanges();
    const snapshot = task.snapshotChanges();

    task.then(res => {
      for (let i = 0; i < this.ListTaskAttachment.length; i++) {
        if (this.ListTaskAttachment[i].name === name) {
          this.ListTaskAttachment[i].response = res;

          const r = this.storage.ref(this.ListTaskAttachment[i].path);
          console.log('Attachment response', this.ListTaskAttachment[i]);
          console.log('r', r);
        }
      }
    });

    const currentTask: UploadTask = {
      id: id,
      name: name,
      type: type,
      iconPath: this._FileTypeService.getIconPath(type),
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
  iconPath?: string;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  progressBar: {color: string, mode: string};
  response: any;

  path?: string;
}

