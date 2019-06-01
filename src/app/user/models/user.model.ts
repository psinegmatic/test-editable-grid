import { GridPagination } from './grid.model';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserReq extends GridPagination {
  data: User[];
}
