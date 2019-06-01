import * as UserActions from './user.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { GridPagination } from '../models/grid.model';
import { User } from '../models/user.model';


export interface UserState extends EntityState<User> {
  loading: boolean;
  error: any;
  pagination: GridPagination;
}

const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserState = adapter.getInitialState({
  loading: false,
  error: null,
  pagination: null,
});

export const {
  selectAll
} = adapter.getSelectors();

export function userReducer(state = initialState, action: UserActions.Actions): UserState {
  switch (action.type) {
    case UserActions.GET_USERS: {
      return adapter.removeAll({
          ...state,
          loading: true,
          error: null
        });
    }
    case UserActions.GET_USERS_SUCCESS: {
      return adapter.addAll(action.payload.data, {
        ...state,
        loading: false,
        pagination: {
          page: action.payload.page,
          per_page: action.payload.per_page,
          total: action.payload.total,
          total_pages: action.payload.total_pages,
        },
        error: null
      });
    }
    case UserActions.GET_USERS_ERROR: {
      return adapter.removeAll({
        ...state,
        loading: false,
        error: action.payload
      });
    }

    case UserActions.UPDATE_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case UserActions.UPDATE_USER_SUCCESS: {
      return adapter.updateOne(action.payload,
        {
          ...state,
          loading: false,
          error: null
        }
      );
    }
    case UserActions.UPDATE_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
