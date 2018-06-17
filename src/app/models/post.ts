import { UserInterface } from './user';

export class PostInterface {
  id: string;
  user: UserInterface|string;
  createdDate: Date|number;
  description?: string;
  media?: { type: string; id?: string; downloadURL: string }[]; /** Type ---> tipo de archivo multimedia */
  /** id ---> id o enlace al archivo*/
  attachtment?: { type: string; id?: string; downloadURL: string }[];
}
