import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonEffects } from './common.effects';
import { commonReducer } from './common.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('common', commonReducer),
    EffectsModule.forFeature([CommonEffects]),
  ],
})
export class CommonStoreModule {}
