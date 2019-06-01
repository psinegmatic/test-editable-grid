import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { UpdateUser } from '../store/user.actions';
import { Observable, Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { GridPagination } from '../models/grid.model';
import { User } from '../models/user.model';
import { UpdateNum } from '@ngrx/entity/src/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {
  @Input() users$: Observable<User[]>;
  @Input() pagination$: Observable<GridPagination>;
  @Input() displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'avatar'];
  @Output() changePage = new EventEmitter<PageEvent>();
  @Output() updateColumn = new EventEmitter<UpdateNum<User>>();
  private _controls: FormArray;
  private _destroy$ = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    this.users$
    .pipe(
      filter(users => !! users),
      distinctUntilChanged(),
      takeUntil(this._destroy$)
    )
    .subscribe(
      users => this._controls = new FormArray(users.map(user => {
        return new FormGroup({
          id:  new FormControl(user.id, Validators.required),
          first_name: new FormControl(user.first_name, Validators.required),
          last_name: new FormControl(user.last_name, Validators.required),
          email: new FormControl(user.email, Validators.required),
          avatar: new FormControl(user.avatar, Validators.required)
        }, {updateOn: 'blur'});
      }))
    );
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  public onPage(e: PageEvent): void {
    this.changePage.emit(e);
  }

  public updateField(firstValue: string, index: number, fieldName: string): void {
    const control = this.getControl(index, fieldName);
    if (control.valid && firstValue !== control.value) {
      const userFromForm = this._controls.at(index).value as User;
      this.updateColumn.emit({id: userFromForm.id, changes: {
        id: userFromForm.id,
        [fieldName]: control.value
      }});
    }
   }

   public getControl(index: number, fieldName: string): FormControl {
    return this._controls.at(index).get(fieldName) as FormControl;
  }

}
