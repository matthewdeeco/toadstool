import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import * as actions from './actions';
import { Hero } from './models/hero';
import { HeroMatchup } from './models/hero-matchup';

const heroesReducer = createReducer(
  {} as Record<Hero['id'], Hero>,
).handleAction(actions.LOAD_HEROES.success, (state, action) =>
  action.payload.reduce((result, hero) => ({ ...result, [hero.id]: hero }), {}),
);

const heroIdsReducer = createReducer([] as Hero['id'][]).handleAction(
  actions.LOAD_HEROES.success,
  (state, action) => action.payload.map((hero) => hero.id),
);

const heroMatchupsReducer = createReducer(
  {} as Record<Hero['id'], HeroMatchup[]>,
).handleAction(actions.LOAD_HERO_MATCHUPS.success, (state, action) => ({
  ...state,
  [action.payload.heroId]: action.payload.matchups,
}));

const rootReducer = combineReducers({
  heroes: heroesReducer,
  heroMatchups: heroMatchupsReducer,
  heroIds: heroIdsReducer,
});

export default rootReducer;
