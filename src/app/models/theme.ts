import { PostInterface } from "./post";

export class ThemeInterface {
  id: string;
  name: string;
  subthemes: string[];
  posts: PostInterface[];
}


