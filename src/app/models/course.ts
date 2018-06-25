import { UserInterface } from './user';
import { ThemeInterface } from './theme';
import { InstitutionInterface } from './institution';

export interface CourseInterface {
  id: string;
  name: string;
  code: string;
  email_owner: string;
  instructors?: string[];
  institution: InstitutionInterface;
  groups?: string[];
  themes?: { id: string; name: string }[];
  lastUpdate?: Date;
  posts?: string[];
}

export interface ItemCourseInterface {
  id: string;
  name: string;
  lastUpdate?: Date | number;
  numStudents?: number;
  numInstructors?: number;
  nameInstitution?: string;
}


