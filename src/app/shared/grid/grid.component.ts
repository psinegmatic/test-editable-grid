import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { UpdateNum } from '@ngrx/entity/src/models';
import { GridPagination, GridColumnsConfig, EGridContentType } from 'src/app/user/models/grid.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy {
  @Input() data$: Observable<{[name: string]: any}[]>;
  @Input() pagination$: Observable<GridPagination>;
  @Input() displayedColumns: string[];
  @Input() columns: GridColumnsConfig[];
  @Output() changePage = new EventEmitter<PageEvent>();
  @Output() updateColumn = new EventEmitter<UpdateNum<{[name: string]: any}>>();
  private _controls: FormArray;
  private _destroy$ = new Subject<boolean>();
  public eGridContentType = EGridContentType;

  constructor() { }

  ngOnInit() {
    this.data$
    .pipe(
      filter(data => !! data),
      distinctUntilChanged(),
      takeUntil(this._destroy$)
    )
    .subscribe(
      data => this._controls = this.createFormArray(data)
    );
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  public createFormArray(gridData: Array<object>): FormArray {
    const arr = gridData.map(item => {
      const formGroup = {};
      for (const key of Object.keys(item)) {
        formGroup[key] = new FormControl(item[key], Validators.required);
      }
      return new FormGroup(formGroup);
    });
    return new FormArray(arr);
  }

  public onPage(e: PageEvent): void {
    this.changePage.emit(e);
  }

  public updateField(firstValue: string, index: number, fieldName: string): void {
    const control = this.getControl(index, fieldName);
    if (control.valid && firstValue !== control.value) {
      const valueFromControl = this._controls.at(index).value;
      this.updateColumn.emit({id: valueFromControl.id, changes: {
        id: valueFromControl.id,
        [fieldName]: control.value
      }});
    }
   }

   public getControl(index: number, fieldName: string): FormControl {
    return this._controls.at(index).get(fieldName) as FormControl;
  }

}
