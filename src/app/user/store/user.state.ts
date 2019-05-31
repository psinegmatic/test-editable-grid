export interface UserState {
  users: {
    data: any;
    isLoading?: boolean;
    error?: any;
  };
}

export const initialState: UserState = {
  users: {
    data: null,
    isLoading: false,
    error: null
  }
};
