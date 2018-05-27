export class Day {
  day: string;
  duration: { InitHour: Number; FinishHour: Number }[];

  constructor(day: string, duration: { InitHour: Number; FinishHour: Number }[]) {
    this.day = day;
    this.duration = duration;
  }

  getDay(): string {
    return this.day;
  }

  setDay(day: string): void {
    this.day = day;
  }

  getDuration(): { InitHour: Number; FinishHour: Number }[] {
    return this.duration;
  }

  setDuration(duration: { InitHour: Number; FinishHour: Number }[]): void {
    this.duration = duration;
  }

  getJSON(): Object {
    return {
      day: this.day,
      duration: this.duration
    };
  }
}
