import {
  randomizationReducer,
  RandomizationState as RandomizationEntityState,
} from './randomization/randomization.reducer';
import {
  selectedCategoryListReducer,
  SelectedCategoryListState,
} from './selected-category-list/selected-category-list.reducer';
import {
  usedQuestionListReducer,
  UsedQuestionListState,
} from './used-question-list/used-question-list.reducer';

export class RandomizationState {
  randomization!: RandomizationEntityState;
  selectedCategoryList!: SelectedCategoryListState;
  usedQuestionList!: UsedQuestionListState;
}

export const reducers = {
  randomization: randomizationReducer,
  selectedCategoryList: selectedCategoryListReducer,
  usedQuestionList: usedQuestionListReducer,
};
