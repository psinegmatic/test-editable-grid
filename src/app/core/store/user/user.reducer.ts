import * as UserActions from './user.actions';
import { initialState, State } from './user.state';

export function userReducer(state = initialState, action: UserActions.Actions): State {
  switch (action.type) {
    case UserActions.GET_USERS: {
      return {
        ...state,
        users: {
          ...state.users,
          isLoading: true,
          error: null
        }
      };
    }
    case UserActions.GET_USERS_SUCCESS: {
      return  {
        ...state,
        users: {
          ...state.users,
          data: action.payload,
          isLoading: false
        }
      };
    }
    case UserActions.GET_USERS_ERROR: {
      return {
        ...state,
        users: {
          ...state.users,
          isLoading: action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
}
