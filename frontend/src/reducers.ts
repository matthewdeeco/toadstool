import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import * as actions from './actions';
import { Hero } from './models/hero';


const heroesReducer = createReducer([] as Hero[]).handleAction(
  actions.LOAD_HEROES.success,
  (state, action) =>
    action.payload.sort((hero1, hero2) =>
      hero1.localized_name < hero2.localized_name ? -1 : 1,
    ),
);

const rootReducer = combineReducers({
  heroes: heroesReducer,
});

export default rootReducer;
