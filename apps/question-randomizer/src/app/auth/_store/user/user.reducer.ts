import { createReducer, on } from '@ngrx/store';
import {
  createUser,
  createUserError,
  createUserSuccess,
  initUser,
  initUserAuthorizedSuccess,
  initUserError,
  initUserUnauthorizedSuccess,
  signInEmail,
  signInEmailError,
  signInEmailSuccess,
  signOut,
  signOutError,
  signOutSuccess,
  signUpEmail,
  signUpEmailError,
  signUpEmailSuccess,
  updateUser,
  updateUserError,
  updateUserSuccess,
} from './user.actions';
import { User } from '../../../core/_models/backend/user/user.model';

export interface UserState {
  entity: User | null;
  uid: string | null;
  isLoading: boolean | null;
  error: string | null;
}

export const initialState: UserState = {
  entity: null,
  uid: null,
  isLoading: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  // Init
  on(initUser, (state) => ({ ...state, isLoading: true })),
  on(initUserAuthorizedSuccess, (state, { uid, entity }) => ({
    ...state,
    uid,
    entity,
    isLoading: false,
    error: null,
  })),
  on(initUserUnauthorizedSuccess, (state) => ({
    ...state,
    user: null,
    isLoading: false,
    error: null,
  })),
  on(initUserError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  // Sign In
  on(signInEmail, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(signInEmailSuccess, (state, { uid, user }) => ({
    ...state,
    uid,
    user,
    isLoading: false,
    error: null,
  })),
  on(signInEmailError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  // Sign Up
  on(signUpEmail, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(signUpEmailSuccess, (state, { uid }) => ({
    ...state,
    uid,
    isLoading: false,
    error: null,
  })),
  on(signUpEmailError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  // Sign Out
  on(signOut, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(signOutSuccess, (state) => ({
    ...initialState,
  })),
  on(signOutError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  // Create
  on(createUser, (state, { request }) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(createUserSuccess, (state, { entity }) => ({
    ...state,
    isLoading: false,
    entity,
  })),
  on(createUserError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  // Update
  on(updateUser, (state, { entity }) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(updateUserSuccess, (state, { entity }) => ({
    ...state,
    isLoading: false,
    entity,
  })),
  on(updateUserError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
