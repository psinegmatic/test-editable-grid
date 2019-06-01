import { Component, OnInit, Output, EventEmitter, ElementRef, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { fromEvent, BehaviorSubject, Subject } from 'rxjs';
import { filter, take, switchMapTo, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
export type ViewType = 'view' | 'edit';

@Component({
  selector: 'app-grid-edit',
  template: `
          <span *ngIf="(mode$ | async) === 'view'" title="Edit on double click">
            {{content}}
          </span>
          <input [formControl]="control" *ngIf="(mode$ | async) === 'edit'" (keyup.enter)="toViewMode()">
  `,
  styleUrls: ['./grid-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridEditComponent implements OnInit, OnDestroy {
  @Output() updateControl: EventEmitter<string> = new EventEmitter();
  @Input() content: string;
  @Input() control: FormControl;
  private _firstValue: string;
  private _destroy$ = new Subject<boolean>();

  public mode$: BehaviorSubject<ViewType> = new BehaviorSubject('view') as BehaviorSubject<ViewType>;

  constructor(private _host: ElementRef) {
  }

  ngOnInit() {
    this._viewModeHandler();
    this._editModeHandler();
    this._firstValue = this.control.value;
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  public toViewMode(): void {
    this.updateControl.next(this._firstValue);
    this.mode$.next('view');
  }

  private get _element() {
    return this._host.nativeElement;
  }

  private _viewModeHandler(): void {
    fromEvent(this._element, 'dblclick')
    .pipe(takeUntil(this._destroy$))
    .subscribe(() => {
      this.mode$.next('edit');
    });
  }

  private _editModeHandler(): void {
      const clickOutside$ = fromEvent(document, 'click').pipe(
        filter(({ target }) => this._element.contains(target) === false),
        take(1)
      );

      this.mode$
      .pipe(
        filter(mode => mode === 'edit'),
        switchMapTo(clickOutside$),
        takeUntil(this._destroy$)
      ).subscribe(event => {
        this.toViewMode();
      });
    }
}
