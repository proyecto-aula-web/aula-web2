import { UserInterface } from "./user";

export class PostInterface {
  id: string;
  user: UserInterface;
  createdDate: Date;
  description: string;
  media: { type: string, id: string }[]; /** Type ---> tipo de archivo multimedia */
                                          /** id ---> id o enlace al archivo*/
}
