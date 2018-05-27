import { PostInterface } from "./post";

export class ThemeInterface {
  id: string;
  name: string;
  id_course: string;
  subthemes: string[];
  posts: PostInterface[];
}


