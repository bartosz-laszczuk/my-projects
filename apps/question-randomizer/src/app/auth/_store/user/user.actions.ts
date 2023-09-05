import { createAction, props } from '@ngrx/store';
import { User } from '../../../core/_models/backend/user/user.model';
import { EmailPasswordCredentials } from '../../../core/_models/backend/user/email-password-credentials.model';
import { UserCreateRequest } from '../../../core/_models/backend/user/user-create-request.model';

// Init User

export const initUser = createAction('[User] Init User');

export const initUserAuthorizedSuccess = createAction(
  '[User] Init User Authorized Success',
  props<{ uid: string; entity: User | null }>()
);

export const initUserUnauthorizedSuccess = createAction(
  '[User] Init User Unauthorized Success'
);

export const initUserError = createAction(
  '[User] Init User Error',
  props<{ error: string }>()
);

// Sign In

export const signInEmail = createAction(
  '[User] Sign In Email',
  props<{ credentials: EmailPasswordCredentials }>()
);

export const signInEmailSuccess = createAction(
  '[User] Sign In Email Success',
  props<{ uid: string; user: User | null }>()
);

export const signInEmailError = createAction(
  '[User] Sign In Email Success',
  props<{ error: string }>()
);

// Sign Up

export const signUpEmail = createAction(
  '[User] Sign Up Email',
  props<{ credentials: EmailPasswordCredentials }>()
);

export const signUpEmailSuccess = createAction(
  '[User] Sign Up Email Success',
  props<{ uid: string }>()
);

export const signUpEmailError = createAction(
  '[User] Sign Up Email Error',
  props<{ error: string }>()
);

// Sign Out

export const signOut = createAction('[User] Sign Out');

export const signOutSuccess = createAction('[User] Sign Out Email');

export const signOutError = createAction(
  '[User] Sign Out Email',
  props<{ error: string }>()
);

// Create

export const createUser = createAction(
  '[User] Create User',
  props<{ request: UserCreateRequest }>()
);

export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ entity: User }>()
);

export const createUserError = createAction(
  '[User] Create User Error',
  props<{ error: string }>()
);

// Update

export const updateUser = createAction(
  '[User] Update User',
  props<{ entity: User }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ entity: User }>()
);

export const updateUserError = createAction(
  '[User] Update User Error',
  props<{ error: string }>()
);
