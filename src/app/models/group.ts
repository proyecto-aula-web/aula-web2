import { DayInterface } from './day';
import { EvaluationInterface } from './evaluation';

export interface GroupInterface {
  
  id: string;
  id_course: string;
  name: string;
  stundents?: string [];
  schedule?: DayInterface[] /** horario */;
  evaluations?: EvaluationInterface[];

}