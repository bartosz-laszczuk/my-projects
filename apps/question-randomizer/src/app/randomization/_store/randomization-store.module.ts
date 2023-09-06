import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from './randomization.effects';
import { reducers } from './randomization.reducer';
import { RandomizationFacade } from './randomization/randomization.facade';
import { SelectedCategoryListFacade } from './selected-category-list/selected-category-list.facade';
import { UsedQuestionListFacade } from './used-question-list/used-question-list.facade';

@NgModule({
  imports: [
    StoreModule.forFeature('randomization', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    RandomizationFacade,
    UsedQuestionListFacade,
    SelectedCategoryListFacade,
  ],
})
export class RandomizationStoreModule {}
