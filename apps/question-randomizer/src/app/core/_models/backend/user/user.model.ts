import { FieldValue } from 'firebase/firestore';
import { Employee } from '../employee.model';
import { Recruiter } from '../recruiter.model';

export interface User {
  uid: string;
  name?: string;
  photoURL?: string;
  email?: string;
  country?: string;
  about?: string;
  roleId?: string;
  role: Employee | Recruiter;
  created: FieldValue;
  updated?: FieldValue;
}
