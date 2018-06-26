import { Instructor } from "./user";

export class Evaluation {
  themes: {id: string, name: string}[];
  name: string;
  description: string;
  groupId: string[];
  date: Date;
  percent: Number;
  instructors: Instructor[];

  constructor(
    themes: {id: string, name: string}[],
    name: string,
    description: string,
    groupId: string[],
    date: Date,
    percent: Number,
    instructors: Instructor[]
  ) {
    this.themes = themes;
    this.name = name;
    this.description  = description;
    this.groupId = groupId;
    this.date = date;
    this.percent = percent;
    this.instructors = instructors;
  }

  getThemeDatas(): {id: string, name: string}[] {
    return this.themes;
  }

  setThemes( themes: {id: string, name: string}[]): void {
    this.themes = themes;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  getGroupId(): string[] {
    return this.groupId;
  }
  setGroupId(groupId: string[]): void {
    this.groupId = groupId;
  }

  getDate(): Date {
    return this.date;
  }

  setDate(date: Date): void {
    this.date = date;
  }

  getPercent(): Number {
    return this.percent;
  }

  setPercent(percent: Number): void {
    this.percent = percent;
  }

  getInstructors(): Instructor[] {
    return this.instructors;
  }

  setInstructors(instructors: Instructor[]): void {
    this.instructors = instructors;
  }

  getJSON() {
    return {
      themes : this.themes,
      name : this.name,
      description : this.description,
      groupId : this.groupId,
      date : this.date,
      percent : this.percent,
      instructors : this.instructors,

    };
  }

}
