import { User } from './user.model';

export type UserCreateRequest = Omit<User, 'uid' | 'email' | 'created'>;
