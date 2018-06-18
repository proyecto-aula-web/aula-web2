import { DayInterface } from './day';

export interface HorarioInterface {
  id_group: string;
  name_group: string;
  days: DayInterface[];
}
