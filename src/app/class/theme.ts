import { Post } from "./post";

export class Theme {
  id: string;
  name: string;
  subthemes: string[];
  posts: Post[];

  constructor(
    id: string,
    name: string,
    subthemes: string[],
    posts: Post[]

  ) {
    this.id = id;
    this.name = name;
    this.subthemes = subthemes;
    this.posts = posts;
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getSubthemes(): string {
    return this.name;
  }

  setSubthemes(subthemes: string[]): void {
    this.subthemes = subthemes;
  }

  getPosts(): string {
    return this.name;
  }

  setPosts(posts: Post[]): void {
    this.posts = posts;
  }

  getJSON() {
    return {
      id : this.id,
      name : this.name,
      subthemes : this.subthemes,
      posts : this.posts
    };
  }

}


