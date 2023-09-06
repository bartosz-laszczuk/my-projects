import { FieldValue } from 'firebase/firestore';

export interface UsedQuestionCreateRequest {
  questionId: string;
  randomizationId: string;
  created: FieldValue;
}
