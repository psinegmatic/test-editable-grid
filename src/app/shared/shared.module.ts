import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridEditComponent } from './grid-edit/grid-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GridEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [GridEditComponent]
})
export class SharedModule { }
