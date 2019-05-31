import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './../user/user.reducer';

export const selectUserState = createFeatureSelector<fromUser.UserState>('user');

export const selectAllUsers = createSelector(
  selectUserState,
  fromUser.selectAll
);

export const selectPaginationUsers = createSelector(
  selectUserState,
  userState => userState.pagination
);
