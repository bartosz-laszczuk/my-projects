import { FieldValue } from 'firebase/firestore';
import { RandomizationStatus } from '../../_enums/randomization-status.enum';
import { Question } from '../../../questions/_models/frontend/question.model';

export interface Randomization {
  id: string;
  currentQuestion?: Question;
  isAnswerHidden: boolean;
  status: RandomizationStatus;
  created: FieldValue;
}
