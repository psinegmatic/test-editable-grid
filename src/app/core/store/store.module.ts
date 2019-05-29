import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { JokeStoreModule } from './joke-store';

@NgModule({
  imports: [
    CommonModule,
    JokeStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  declarations: []
})
export class RootStoreModule {}
