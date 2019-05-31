import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { UserService } from './services/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private _userService: UserService,
    private _actions$: Actions
  ) { }

  @Effect()
  getUsers$: Observable<Action> = this._actions$.pipe(
    ofType(UserActions.GET_USERS),
    switchMap((action: UserActions.GetUsers) =>
      this._userService.getUsers(action.payload).pipe(
        map(data => new UserActions.GetUsersSuccess(data)),
        catchError(error => {
          return of(new UserActions.GetUsersError(error));
        })
      )
    )
  );
}


