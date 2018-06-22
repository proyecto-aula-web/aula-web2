// import { UserInterface } from './user';

export class PostInterface {
  /** id ---> id o enlace al archivo*/
  id: string;
  user: string;
  description?: string;
  createdDate: number;
  media?: PostMediaInterface[]; /** Type ---> tipo de archivo multimedia */
  attachtment?: PostAttachmentInterface[];

  date?: string;  /** usado solo para la vista */
  color?: string;  /** usado solo para la vista */
}
// export class PostPrintInterface {
//   user: string;
//   createdDate: Date;
//   description?: string;
//   media?: PostMediaInterface[]; /** Type ---> tipo de archivo multimedia */
//   /** id ---> id o enlace al archivo*/
//   attachtment?: PostAttachmentInterface[];
// }

export class PostMediaInterface {
  type: string;
  id?: string;
  downloadURL: string;
}

export class PostAttachmentInterface {
  type: string;
  downloadURL: string;
  id?: string;
  name?: string;
  iconPath?: string; /** usado solo para la vista */
}

