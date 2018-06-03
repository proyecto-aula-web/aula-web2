import { InstructorInterface, StudentInterface } from './user';
import { DayInterface } from './day';
import { EvaluationInterface } from './evaluation';
import { ThemeInterface } from './theme';
import { InstitutionInterface } from './institution';

export interface CourseInterface {
  id: string;
  name: string;
  code: string;
  institution: InstitutionInterface;
  instructors?: InstructorInterface[];
  stundens?: StudentInterface[];
  schedule?: DayInterface[] /** horario */;
  evaluations?: EvaluationInterface[];
  themes?: ThemeInterface[];
  lastUpdate?: string;
}

export interface ItemCourseInterface {
  id: string;
  name: string;
  lastUpdate?: Date | number;
  numStudents?: number;
  numInstructors?: number;
  nameInstitution?: string;
}


