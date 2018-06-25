export interface ThemeInterface {
  id?: string;
  name?: string;
  id_course?: string;
  subthemes?: { id: string, name: string }[];
  description?: string;
  posts?: string[];
}


