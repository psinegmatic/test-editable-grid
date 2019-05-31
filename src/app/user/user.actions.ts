import { Action } from '@ngrx/store';
import { GridPagination } from './user.reducer';

// get Users
export const GET_USERS = '[News] Get News';
export const GET_USERS_SUCCESS = '[News] Get News -> Success';
export const GET_USERS_ERROR = '[News] Get News -> Error';

export class GetUsers implements Action {
  readonly type = GET_USERS;
  constructor(public payload?: GridPagination) {}
}
export class GetUsersSuccess implements Action {
  readonly type = GET_USERS_SUCCESS;
  constructor(public payload: any) { }
}
export class GetUsersError implements Action {
  readonly type = GET_USERS_ERROR;
  constructor(public payload: any) { }
}

export type Actions =
  GetUsers |
  GetUsersSuccess |
  GetUsersError;
