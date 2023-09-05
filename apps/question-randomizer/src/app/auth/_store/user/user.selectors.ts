import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const getUserState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(getUserState, (state) => state.entity);

export const getIsLoading = createSelector(
  getUserState,
  (state) => state.isLoading
);

export const getIsAuthorized = createSelector(
  getUserState,
  (state) => !!state.uid
);

export const getRoleId = createSelector(getUser, (user) => user && user.roleId);

export const getUserId = createSelector(getUserState, (state) => state.uid);
