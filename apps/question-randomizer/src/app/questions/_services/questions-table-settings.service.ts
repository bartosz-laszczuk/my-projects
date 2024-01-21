import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Question } from '../_models/frontend/question.model';
import { QuestionsFacade } from '../_store/questions.facade';
import { SettingsService } from '../../settings/_services/settings.service';
import { Language } from '../../core/_enums/language.enum';
import { BaseTableSettingsService, IColumn } from '@my-projects/shared/ui-crt';

@Injectable()
export class QuestionsTableSettingsService extends BaseTableSettingsService<Question> {
  constructor(
    private questionsFacade: QuestionsFacade,
    _settingsService: SettingsService
  ) {
    super();
    const language = _settingsService.language$.value;
    this.columns = [
      {
        displayName: 'Question',
        propertyName: 'question',
        sortable: true,
        width: '40%',
      },
      {
        displayName: 'Answer',
        propertyName: language === Language.ENGLISH ? 'answer' : 'answerPl',
        sortable: true,
        width: '40%',
      },
      {
        displayName: 'Category',
        propertyName: 'categoryName',
        width: '20%',
      },
    ];
  }

  protected override resultsSource$: Observable<Question[]> =
    this.questionsFacade.questionListLoaded$.pipe(shareReplay(1));

  public override columns: IColumn[];
}
