import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GridComponent } from './grid/grid.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GridEditComponent } from './grid-edit/grid-edit.component';

@NgModule({
  declarations: [
    GridEditComponent,
    GridComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
    GridComponent,
    GridEditComponent
  ]
})
export class SharedModule { }
