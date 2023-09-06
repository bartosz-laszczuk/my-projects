import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Randomization } from './_models/frontend/randomization.model';
import { ControlItem, Value } from '../core/_models/frontend';
import { Language } from '../core/_enums/language.enum';
import { RandomizationFacade } from './_store/randomization/randomization.facade';
import { DictionariesFacade } from '../core/_store/dictionaries/dictionaries.facade';
import { SelectedCategoryListFacade } from './_store/selected-category-list/selected-category-list.facade';
import { RandomizationService } from './_services/randomization.service';
import { UsedQuestionListFacade } from './_store/used-question-list/used-question-list.facade';
import { LanguageService } from '../core/_services/language.service';
import { RandomizationStatus } from './_enums/randomization-status.enum';
import { QuestionsFacade } from '../questions/_store/questions.facade';

@Component({
  selector: 'my-projects-randomization',
  templateUrl: './randomization.component.html',
  styleUrls: ['./randomization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomizationComponent {
  numberOfProgressBars = 44;
  iterableArray = Array(this.numberOfProgressBars);
  randomization: Randomization | undefined;
  progress = 0;
  categoryControlItems$: Observable<ControlItem[]> =
    this._dictionariesFacade.categoryControlItems$;
  selectedCategoryIdListLoaded$: Observable<string[]> =
    this._selectedCategoryListFacade.selectedCategoryIdListLoaded$;
  randomizationProgress$: Observable<number> =
    this._randomizationService.randomizationProgress$;
  isPreviousDisabled$: Observable<boolean> =
    this._randomizationService.usedQuestionsWithCategory$.pipe(
      map((questions) => questions.length === 0)
    );
  isRandomizeDisabled$: Observable<boolean> =
    this._randomizationService.unusedQuestionsWithCategory$.pipe(
      map((questions) => questions.length === 0)
    );
  language$: Observable<Language> = this._languageService.language$;
  languages = Language;
  constructor(
    private _randomizationFacade: RandomizationFacade,
    private _questionsFacade: QuestionsFacade,
    private _dictionariesFacade: DictionariesFacade,
    private _selectedCategoryListFacade: SelectedCategoryListFacade,
    private _randomizationService: RandomizationService,
    private _usedQuestionListFacade: UsedQuestionListFacade,
    private _languageService: LanguageService,
    private _cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this._randomizationFacade.loadRandomization();
    this.initSubscriptions();
  }
  onCategoryFilterChanged(value: Value[]) {
    this._selectedCategoryListFacade.updateSelectedCategoryList(
      value as string[]
    );
  }
  onRandomize() {
    if (this.randomization?.currentQuestion) {
      this._usedQuestionListFacade.addQuestionToUsedQuestions(
        this.randomization?.currentQuestion.id
      );
    }
  }
  onPrevious() {
    this._randomizationService.previousQuestion$
      .pipe(take(1))
      .subscribe((previousQuestion) =>
        this._randomizationFacade.updateQuestionAsCurrent(previousQuestion)
      );
  }
  onShowAnswer() {
    if (!this.randomization) {
      return;
    }
    this.randomization.isAnswerHidden = !this.randomization.isAnswerHidden;
    this._randomizationFacade.updateRandomization(this.randomization);
  }
  onReset() {
    if (!this.randomization) {
      return;
    }
    this._randomizationFacade.reset(this.randomization.id);
  }
  onChangeLanguage() {
    this.language$
      .pipe(take(1))
      .subscribe((language) =>
        this._languageService.setLanguage(
          language === Language.ENGLISH ? Language.POLISH : Language.ENGLISH
        )
      );
  }
  isBarFilled(index: number, progress: number): boolean {
    const progressPercentage = progress / 100;
    const indexPercentage = index / this.numberOfProgressBars;
    return indexPercentage < progressPercentage;
  }
  private initSubscriptions() {
    // TODO
    // add takeuntil destroyed everywhere
    this._questionsFacade.questionList$.subscribe((questionList) => {
      if (!questionList) {
        this._questionsFacade.loadQuestionList();
      }
    });
    this._randomizationFacade.randomizationLoaded$.subscribe(
      (randomization) => {
        this.randomization = { ...randomization };
        if (
          !randomization.currentQuestion &&
          randomization.status !== RandomizationStatus.Finished
        ) {
          this._randomizationFacade.randomizeQuestion();
        }
        this._cdr.markForCheck();
      }
    );
    this.randomizationProgress$.subscribe(
      (progress) => (this.progress = progress)
    );
  }
}
