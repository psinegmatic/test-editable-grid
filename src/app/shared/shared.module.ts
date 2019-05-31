import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridEditComponent } from './grid-edit/grid-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GridEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [GridEditComponent]
})
export class SharedModule { }
