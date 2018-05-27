import { Instructor, Student } from "./user";
import { Day } from "./day";
import { Evaluation } from "./evaluation";
import { Theme } from "./theme";

export class Course {

  id: string;
  name: string;
  instructors: Instructor[];
  stundens: Student[];
  schedule: Day[];     /** horario */
  evaluations: Evaluation[];
  themes: Theme[];

  constructor(
    id: string,
    name: string,
    instructors: Instructor[],
    stundens: Student[],
    schedule: Day[],
    evaluations: Evaluation[],
    themes: Theme[]
  ) {
    this.id = id;
    this.name = name;
    this.instructors = instructors;
    this.stundens = stundens;
    this.schedule = schedule;
    this.evaluations = evaluations;
    this.themes = themes;
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

  getInstructors(): Instructor[] {
    return this.instructors;
  }

  setInstructors(instructors: Instructor[]): void {
    this.instructors = instructors;
  }

  getStudents(): Student[] {
    return this.stundens;
  }

  setStudents(stundens: Student[]): void {
    this.stundens = stundens;
  }

  getSchedule(): Day[] {
    return this.schedule;
  }

  setSchedule(schedule: Day[]): void {
    this.schedule = schedule;
  }
  getEvaluations(): Evaluation[] {
    return this.evaluations;
  }

  setEvaluations(evaluations: Evaluation[]): void {
    this.evaluations = evaluations;
  }

  getThemes(): Theme[] {
    return this.themes;
  }

  setThemes(themes: Theme[]): void {
    this.themes = themes;
  }

  getJSON(): Object {
    return {
      id: this.id,
      name: this.name,
      instructors: this.instructors,
      stundens: this.stundens,
      schedule: this.schedule,
      evaluations: this.evaluations,
      themes: this.themes,
    };
  }
}
