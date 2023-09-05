import { FieldValue } from 'firebase/firestore';

export interface User {
  uid: string;
  name?: string;
  photoURL?: string;
  email?: string;
  country?: string;
  about?: string;
  roleId?: string;
  role: any;
  created: FieldValue;
  updated?: FieldValue;
}
