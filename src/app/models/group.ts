import { DayInterface } from './day';
import { EvaluationInterface } from './evaluation';

export interface GroupInterface {

  id: string;
  id_course: string;
  name: string;
  stundents?: string [];
  date_ini: string,
  date_cul: string,
  schedule?: DayInterface[] /** horario */;
  evaluations?: EvaluationInterface[];

}
