import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import * as actions from './actions';
import { Hero } from './models/hero';
import { HeroMatchup } from './models/hero-matchup';

const heroesReducer = createReducer([] as Hero[]).handleAction(
  actions.LOAD_HEROES.success,
  (state, action) => action.payload,
);

const heroMatchupsReducer = createReducer([] as HeroMatchup[]).handleAction(
  actions.LOAD_HERO_MATCHUPS.success,
  (state, action) => action.payload,
);

const rootReducer = combineReducers({
  heroes: heroesReducer,
  heroMatchups: heroMatchupsReducer,
});

export default rootReducer;
