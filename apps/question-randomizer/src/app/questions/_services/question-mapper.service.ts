import { Injectable } from '@angular/core';
import { Question as QuestionBe } from '../_models/backend/question.model';
import { QuestionCreateRequest } from '../_models/backend/question-create-request.model';
import { Question as QuestionFe } from '../_models/frontend/question.model';
import { serverTimestamp } from 'firebase/firestore';
import { DictionaryItem } from '../../core/_models/frontend';
import { QuestionCsvListItem } from '../_models/frontend/question-csv-list-item.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionMapperService {
  questionToQuestionCreateRequest(question: QuestionFe): QuestionCreateRequest {
    return {
      question: question.question,
      answer: question.answer,
      categoryId: question.categoryId,
      qualificationId: question.qualificationId,
      isActive: question.isActive,
    } as QuestionCreateRequest;
  }

  questionToDbQuestion(question: QuestionFe): QuestionBe {
    return { ...question, updated: serverTimestamp() } as QuestionBe;
  }

  questionDbQuestionFe(
    question: QuestionBe,
    categories: DictionaryItem[]
  ): QuestionFe {
    return {
      ...question,
      categoryName:
        categories.find((c) => c.id === question.categoryId)?.name ?? '',
    };
  }

  questionCsvToQuestionCreateRequest(
    question: QuestionCsvListItem,
    categories: DictionaryItem[],
    qualifications: DictionaryItem[]
  ): QuestionCreateRequest {
    return {
      question: question.question,
      answer: question.answer,
      answerPl: question.answerPl,
      categoryId: categories.find(
        (category) => category.name === question.categoryName
      )?.id,
      qualificationId:
        qualifications.find(
          (qualification) => qualification.name === question.qualificationName
        )?.id ?? null,
      isActive: question.isActive,
      created: serverTimestamp(),
    } as QuestionCreateRequest;
  }
}
