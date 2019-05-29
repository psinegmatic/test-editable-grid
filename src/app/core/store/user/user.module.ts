import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GridStoreEffects } from './user.effects';
import { userReducer } from './user.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('grid', gridReducer),

    EffectsModule.forFeature([GridStoreEffects])
  ],
  providers: [GridStoreEffects]
})
export class UserStoreModule {}
