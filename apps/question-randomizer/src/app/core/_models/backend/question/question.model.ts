import { FieldValue } from 'firebase/firestore';

export interface Question {
  id: string;
  question: string;
  answer: string;
  answerPl: string;
  categoryId: string;
  qualificationId: string;
  created: FieldValue;
  updated?: FieldValue;
  isActive: boolean;
}
