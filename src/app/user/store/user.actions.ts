import { Action } from '@ngrx/store';
import { GridPagination, User } from './user.reducer';
import { Update } from '@ngrx/entity';

// get Users
export const GET_USERS = '[User] Get News';
export const GET_USERS_SUCCESS = '[User] Get News -> Success';
export const GET_USERS_ERROR = '[User] Get News -> Error';

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

// update Users
export const UPDATE_USER = '[User] Update User';
export const UPDATE_USER_SUCCESS = '[User] Update User -> Success';
export const UPDATE_USER_ERROR = '[User] Update User -> Error';

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  constructor(public payload: Update<User>) {}
}
export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS;
  constructor(public payload: Update<User>) { }
}
export class UpdateUserError implements Action {
  readonly type = UPDATE_USER_ERROR;
  constructor(public payload: any) { }
}

export type Actions =
  GetUsers |
  GetUsersSuccess |
  GetUsersError |

  UpdateUser |
  UpdateUserSuccess |
  UpdateUserError;
