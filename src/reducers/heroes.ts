import { createReducer } from 'typesafe-actions';

import * as actions from '../actions';
import { Hero } from '../models/hero';


export const heroesReducer = createReducer(
  {} as Record<Hero['id'], Hero>,
).handleAction(actions.LOAD_HEROES.success, (state, action) =>
  action.payload.reduce((result, hero) => ({ ...result, [hero.id]: hero }), {}),
);

export const heroIdsReducer = createReducer([] as Hero['id'][]).handleAction(
  actions.LOAD_HEROES.success,
  (state, action) => action.payload.map((hero) => hero.id),
);
