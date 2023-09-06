import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import {
  loadRandomization,
  randomizeQuestion,
  resetRandomization,
  updateQuestionAsCurrent,
  updateRandomization,
} from './randomization.actions';
import { RandomizationState } from './randomization.reducer';
import { getRandomization } from './randomization.selectors';
import { Randomization } from '../../_models/frontend/randomization.model';
import { UserFacade } from '../../../auth/_store/user/user.facade';
import { Question } from '../../../questions/_models/frontend/question.model';

@Injectable({
  providedIn: 'root',
})
export class RandomizationFacade {
  randomizationLoaded$ = this._store.pipe(
    select(getRandomization),
    filter((randomization) => !!randomization),
    map((randomization) => randomization as Randomization)
  );
  constructor(
    private _store: Store<RandomizationState>,
    private _userFacade: UserFacade
  ) {}

  loadRandomization() {
    this._userFacade.userId$.subscribe((uid) =>
      this._store.dispatch(loadRandomization({ uid }))
    );
  }

  randomizeQuestion() {
    this._store.dispatch(randomizeQuestion());
  }

  updateQuestionAsCurrent(question: Question) {
    this._store.dispatch(updateQuestionAsCurrent({ question }));
  }

  updateRandomization(randomization: Randomization) {
    this._store.dispatch(updateRandomization({ entity: randomization }));
  }

  reset(randomizationId: string) {
    this._store.dispatch(resetRandomization({ randomizationId }));
  }
}
