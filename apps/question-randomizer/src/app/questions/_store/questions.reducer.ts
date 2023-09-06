import { listReducer, ListState } from './list/list.reducers';

export interface QuestionsState {
  list: ListState;
  // collection: CollectionState;
}

export const reducers = {
  list: listReducer,
  // collection: collectionReducer,
};
