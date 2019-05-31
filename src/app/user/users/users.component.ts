import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { GetUsers } from '../user.actions';
import { Observable } from 'rxjs';
import { User, GridPagination } from '../user.reducer';
import { selectAllUsers, selectPaginationUsers } from '../user.selectors';
import { PageEvent } from '@angular/material/paginator';
import { Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  public users$: Observable<User[]>;
  public pagination$: Observable<GridPagination>;
  public displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'avatar'];
  public controls: FormArray;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new GetUsers());

    this.users$ = this.store.pipe(select(selectAllUsers));
    this.pagination$ = this.store.pipe(select(selectPaginationUsers));

    this.users$
    .pipe(
      filter(user => !! user),
      distinctUntilChanged()
    )
    .subscribe(
      (users => this.controls = new FormArray(users.map(user => {
        return new FormGroup({
          id:  new FormControl(user.id, Validators.required),
          first_name: new FormControl(user.first_name, Validators.required),
          last_name: new FormControl(user.last_name, Validators.required),
          email: new FormControl(user.email, [Validators.required, Validators.email]),
          avatar: new FormControl(user.avatar, Validators.required)
        }, {updateOn: 'blur'});
      })))
    );
  }

  public onPage(e: PageEvent) {
    this.store.dispatch(new GetUsers({page: e.pageIndex + 1, per_page: e.pageSize}));
  }

  public updateField(index, field) {
    const control = this.getControl(index, field);
    if (control.valid) {
      console.log(index, field, control);
    }

   }

   public getControl(index, fieldName) {
    return this.controls.at(index).get(fieldName) as FormControl;
  }

}
