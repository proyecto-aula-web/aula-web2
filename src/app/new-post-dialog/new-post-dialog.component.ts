import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage } from 'ng2-image-compress';
import { AngularFireStorageModule, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { ImageHandlerService } from '../services/image/image-handler.service';
// import { constants } from '../';

@Component({
  selector: 'au-new-post-dialog',
  templateUrl: './new-post-dialog.component.html',
  styleUrls: ['./new-post-dialog.component.css']
})
export class NewPostDialogComponent implements OnInit {
  formNumberValue: MyTel = {
    // area: string, public exchange: string, public subscriber
    area: '00',
    exchange: '00',
    subscriber: '00'
  };

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
    // private custonFormFiedl: MyTelInput,
  ) {}

  ngOnInit() {
    this.simpleForm = this._formBuilder.group({
      description: [''],
      check: false,
      // parts: this._formBuilder.group({
        area: [''],
        exchange: [''],
        subscriber: ['']
      // })
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
    const description = this.simpleForm.get('description');
    const check = this.simpleForm.get('check');

    console.log('description: ', description);
    console.log('description: ', description.value);
    // console.log('check: ', check);
    // console.log('check: ', check.value);
  }

  close() {
    this.dialogRef.close();
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
    const parts = file.name.split('.');
    const path = `${parts[parts.length - 1]}/${new Date().getTime()}_${
      file.name
    }`;

    //  Totally optional metada
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

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
      name: name,
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

    const parts = file.name.split('.');
    const path = `${parts[parts.length - 1]}/${new Date().getTime()}_${
      file.name
    }`;
    //  Totally optional metada
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    console.log(this.storage.ref(path));
    // console.log(this.storage.ref(path));
    const name = file.name;
    const task = this.storage.upload(path, file, { customMetadata });
    const percentage = task.percentageChanges();
    const snapshot = task.snapshotChanges();

    // const _oath
    // let response;

    task.then(res => {
      for (let i = 0; i < this.ListTask.length; i++) {
        if (this.ListTask[i].name === name) {
          this.ListTask[i].response = res;

          console.log(name, this.ListTask[i]);
          const r = this.storage.ref(this.ListTask[i].path);
          console.log(this.ListTask[i]);
        }
      }
    });

    const currentTask: UploadTask = {
      name: name,
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
  name: string;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  progressBar: {color: string, mode: string};
  response: any;

  path?: string;
}

