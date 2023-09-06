import { FieldValue } from 'firebase/firestore';
import { RandomizationStatus } from '../../_enums/randomization-status.enum';

export interface RandomizationCreateRequest {
  uid: string;
  status: RandomizationStatus;
  created: FieldValue;
}
