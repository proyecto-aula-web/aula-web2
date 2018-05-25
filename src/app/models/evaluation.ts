import { InstructorInterface } from "./user";

export interface EvaluationInterface {
  themes: { id: string; name: string }[];
  name: string;
  description: string;
  groupId: string[];
  date: Date;
  percent: Number;
  instructors: InstructorInterface[];
}
