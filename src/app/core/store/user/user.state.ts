export interface State {
  users: {
    data: any;
    isLoading?: boolean;
    error?: any;
  }
}

export const initialState: State = {
  users: {
    data: null,
    isLoading: false,
    error: null
  }
};
