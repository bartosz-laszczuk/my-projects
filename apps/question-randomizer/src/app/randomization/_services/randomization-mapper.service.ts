import { Injectable } from '@angular/core';
import { RandomizationCategory } from '../_models/backend/randomization-category.model';
import { Randomization as RandomizationBe } from '../_models/backend/randomization.model';
import { Randomization as RandomizationFe } from '../_models/frontend/randomization.model';
import { serverTimestamp } from 'firebase/firestore';
import { RandomizationUpdateRequest } from '../_models/backend/randomization/randomization-update-request.model';
import { Category } from '../_models/frontend/category.model';
import { DictionaryItem } from '../../core/_models/frontend';
import { Question } from '../../questions/_models/frontend/question.model';

@Injectable({
  providedIn: 'root',
})
export class RandomizationMapperService {
  randomizationCategoryToCategory(
    randomizationCategory: RandomizationCategory,
    categories: DictionaryItem[]
  ) {
    return {
      id: randomizationCategory.categoryId,
      name: categories.find(
        (category) => category.id === randomizationCategory.categoryId
      )?.name,
    } as Category;
  }

  dbRandomizationToRandomization(
    dbRandomization: RandomizationBe,
    questionList?: Question[]
  ) {
    const randomization = {
      id: dbRandomization.id,
      created: dbRandomization.created,
      status: dbRandomization.status,
      isAnswerHidden: dbRandomization.isAnswerHidden,
    } as RandomizationFe;
    if (dbRandomization.currentQuestionId) {
      randomization.currentQuestion = questionList?.find(
        (question) => question.id === dbRandomization.currentQuestionId
      );
    }
    return randomization;
  }
  randomizationToRandomizationUpdateRequest(
    randomization: RandomizationFe
  ): RandomizationUpdateRequest {
    return {
      id: randomization.id,
      status: randomization.status,
      currentQuestionId: randomization.currentQuestion?.id ?? null,
      isAnswerHidden: randomization.isAnswerHidden,
      updated: serverTimestamp(),
    } as RandomizationUpdateRequest;
  }
}
