import { FieldValue } from 'firebase/firestore';

export interface UsedQuestion {
  id: string;
  questionId: string;
  randomizationId: string;
  created: FieldValue;
}
