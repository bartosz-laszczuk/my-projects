import { Injectable } from '@angular/core';
import { UsedQuestionCreateRequest } from '@my-projects-nx/question-randomizer/randomization/util/models/backend';
import { UsedQuestion } from '@my-projects-nx/question-randomizer/randomization/util/models/frontend';
import { serverTimestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UsedQuestionMapperService {
  usedQuestionToCreateRequest(
    usedQuestion: UsedQuestion
  ): UsedQuestionCreateRequest {
    return {
      questionId: usedQuestion.questionId,
      randomizationId: usedQuestion.randomizationId,
      created: serverTimestamp(),
    } as UsedQuestionCreateRequest;
  }
}
