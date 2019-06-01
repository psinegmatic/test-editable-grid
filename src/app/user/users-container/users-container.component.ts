import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { GetUsers, UpdateUser } from '../store/user.actions';
import { Observable } from 'rxjs';
import { GridPagination, GridColumnsConfig, EGridContentType } from '../../shared/grid/grid.model';
import { User } from '../models/user.model';
import { selectAllUsers, selectPaginationUsers } from '../store/user.selectors';
import { PageEvent } from '@angular/material/paginator';
import { UpdateNum } from '@ngrx/entity/src/models';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersContainerComponent implements OnInit {
  public users$: Observable<User[]>;
  public pagination$: Observable<GridPagination>;
  public displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'avatar'];
  public columns: GridColumnsConfig[] = [
    { columnDef: 'id',
      header: 'Id.',
      editable: false,
      cell: (element: User) => `${element.id}`,
      contentType: EGridContentType.STRING
    },
    { columnDef: 'first_name',
      header: 'First Name',
      editable: true,
      cell: (element: User) => `${element.first_name}`,
      contentType: EGridContentType.STRING},
    { columnDef: 'last_name',
      header: 'Last Name',
      editable: true,
      cell: (element: User) => `${element.last_name}`,
      contentType: EGridContentType.STRING
    },
    { columnDef: 'email',
      header: 'Email',
      editable: true,
      cell: (element: User) => `${element.email}`,
      contentType: EGridContentType.STRING},
    { columnDef: 'avatar',
      header: 'Avatar',
      editable: false,
      cell: (element: User) => `${element.avatar}`,
      contentType: EGridContentType.IMG
    },
  ];

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this._store.dispatch(new GetUsers());

    this.users$ = this._store.pipe(select(selectAllUsers));
    this.pagination$ = this._store.pipe(select(selectPaginationUsers));
  }

  public changePage(e: PageEvent): void {
    this._store.dispatch(new GetUsers({page: e.pageIndex + 1, per_page: e.pageSize}));
  }

  public updateUser(user: UpdateNum<User>) {
    this._store.dispatch(new UpdateUser(user));
  }

}
