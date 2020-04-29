import { combineReducers } from 'redux';

import {
  heroMatchupsReducer,
  counterMatchupsReducer,
  heroPoolMakerStateReducer,
} from './hero-pool-maker';
import { heroesReducer, heroIdsReducer } from './heroes';

const rootReducer = combineReducers({
  heroes: heroesReducer,
  heroIds: heroIdsReducer,
  heroMatchups: heroMatchupsReducer,
  counterMatchups: counterMatchupsReducer,
  heroPoolMakerState: heroPoolMakerStateReducer,
});

export default rootReducer;
