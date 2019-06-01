import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { GridPagination } from '../../shared/grid/grid.model';
import { User, UserReq } from '../models/user.model';

// get Users
export const GET_USERS = '[User] Get Users';
export const GET_USERS_SUCCESS = '[User] Get Users -> Success';
export const GET_USERS_ERROR = '[User] Get Users -> Error';

export class GetUsers implements Action {
  readonly type = GET_USERS;
  constructor(public payload?: GridPagination) {}
}
export class GetUsersSuccess implements Action {
  readonly type = GET_USERS_SUCCESS;
  constructor(public payload: UserReq) { }
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
