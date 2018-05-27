import { User } from "./user";

export class Post {
  id: string;
  user: User;
  createdDate: Date;
  description: string;
  media: { type: string, id: string }[]; /** Type ---> tipo de archivo multimedia */
                                          /** id ---> id o enlace al archivo*/

  constructor(
    id: string,
    user: User,
    createdDate: Date,
    description: string,
    media: { type: string, id: string }[],
  ) {
    this.id = id;
    this.user = user;
    this.createdDate = createdDate;
    this.description = description;
    this.media = media;
  }
  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    /** analizar para eliminar */
    this.id = id;
  }

  getUser(): User {
    return this.user;
  }

  setUser(user: User): void {
    /** analizar para eliminar */
    this.user = user;
  }

  getCreatedDate(): Date {
    return this.createdDate;
  }

  setCreatedDate(createdDate: Date): void {
    /** analizar para eliminar */
    this.createdDate = createdDate;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  getMedia(): { type: string, id: string }[] {
    return this.media;
  }

  setMedia( media: { type: string, id: string }[]): void {
    this.media = media;
  }

  getJSON() {
    return {
      id : this.id,
      user : this.user,
      createdDate : this.createdDate,
      description : this.description,
      media : this.media,
    };
  }

}
