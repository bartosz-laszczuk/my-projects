import { FieldValue } from 'firebase/firestore';
import { RandomizationStatus } from '../../../_enums/randomization-status.enum';

export interface RandomizationUpdateRequest {
  id: string;
  currentQuestionId?: string;
  isAnswerHidden: boolean;
  status: RandomizationStatus;
  updated: FieldValue;
}
