import { FieldValue } from 'firebase/firestore';

export interface QuestionCreateRequest {
  question: string;
  answer: string;
  answerPl: string;
  categoryId: string;
  qualificationId: string;
  isActive: boolean;
  created: FieldValue;
  updated?: FieldValue;
}
