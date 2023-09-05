import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { dictionariesReducer } from './dictionaries.reducer';
import { DictionariesEffects } from './dictionaries.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('dictionaries', dictionariesReducer),
    EffectsModule.forFeature([DictionariesEffects]),
  ],
})
export class DictionariesStoreModule {}
