import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './questions.reducer';
import { effects } from './questions.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('questions', reducers),
    EffectsModule.forFeature(effects),
  ],
})
export class QuestionsStoreModule {}
