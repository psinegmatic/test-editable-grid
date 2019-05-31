import { Component, OnInit, ContentChild, Output, EventEmitter, ElementRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { filter, take, switchMapTo } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-grid-edit',
  template: `
          <span *ngIf="(editMode$ | async) === 'view'">
            {{content}}
          </span>
          <input [formControl]="control" *ngIf="(editMode$ | async) === 'edit'">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridEditComponent implements OnInit {
  @Output() updateControl = new EventEmitter();
  @Input() content: string;
  @Input() control: FormControl;

  editMode$ = new BehaviorSubject('view');

  mode: 'view' | 'edit' = 'view';

  constructor(private host: ElementRef) {
  }

  ngOnInit() {
    this.viewModeHandler();
    this.editModeHandler();
  }

  toViewMode() {
    this.updateControl.next();
    this.editMode$.next('view');
  }

  private get element() {
    return this.host.nativeElement;
  }

  private viewModeHandler() {
    fromEvent(this.element, 'dblclick').pipe(
    ).subscribe(() => {
      this.mode = 'edit';
      this.editMode$.next(this.mode);
    });
  }

  private editModeHandler() {
      const clickOutside$ = fromEvent(document, 'click').pipe(
        filter(({ target }) => this.element.contains(target) === false),
        take(1)
      );

      this.editMode$
      .pipe(
        filter(mode => mode === 'edit'),
        switchMapTo(clickOutside$)
      ).subscribe(event => {
        this.toViewMode();
      });
    }
}
