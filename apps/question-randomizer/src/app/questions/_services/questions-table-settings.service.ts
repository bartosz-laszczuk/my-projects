import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Question } from '../_models/frontend/question.model';
import { QuestionsFacade } from '../_store/questions.facade';
import { SettingsService } from '../../settings/_services/settings.service';
import { Language } from '../../core/_enums/language.enum';
import { BaseTableSettingsService, IColumn } from '@my-projects/shared/ui-crt';
import { TableParameters } from 'libs/shared/ui-crt/src/lib/table/generic-table-material/_models/table-parameters.model';

@Injectable()
export class QuestionsTableSettingsService extends BaseTableSettingsService<Question> {
  constructor(
    private questionsFacade: QuestionsFacade,
    private _settingsService: SettingsService
  ) {
    super();
    this.columns = this.getColumns();
  }

  protected override resultsSource$: Observable<Question[]> =
    this.questionsFacade.questionListLoaded$.pipe(shareReplay(1));

  protected override get tableParametersInitialValues() {
    const interviewMode = this._settingsService.interviewMode$.value;
    return interviewMode
      ? new TableParameters<Question>({ page: { index: 0, size: 22 } })
      : new TableParameters<Question>({ page: { index: 0, size: 18 } });
  }

  public override columns: IColumn[];

  private getColumns() {
    const language = this._settingsService.language$.value;
    const interviewMode = this._settingsService.interviewMode$.value;
    return interviewMode
      ? [
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
            width: '60%',
          },
        ]
      : [
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
}
