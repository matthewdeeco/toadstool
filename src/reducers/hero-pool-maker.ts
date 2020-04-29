import { createReducer } from 'typesafe-actions';

import * as actions from '../actions';

export const heroMatchupsReducer = createReducer({} as actions.HeroMatchupMap)
  .handleAction(actions.LOAD_HERO_MATCHUPS.request, () => ({}))
  .handleAction(actions.LOAD_HERO_MATCHUPS.success, (state, action) => ({
    ...state,
    ...action.payload,
  }));

export enum HERO_POOL_MAKER_STATE {
  LOADING_HEROES,
  LOADED_HEROES,
  LOADING_HERO_MATCHUPS,
  LOADED_HERO_MATCHUPS,
  LOADING_COUNTER_MATCHUPS,
  LOADED_COUNTER_MATCHUPS,
}

export const heroPoolMakerStateReducer = createReducer(
  HERO_POOL_MAKER_STATE.LOADING_HEROES,
)
  .handleAction(
    actions.LOAD_HEROES.success,
    () => HERO_POOL_MAKER_STATE.LOADED_HEROES,
  )
  .handleAction(
    actions.LOAD_HERO_MATCHUPS.request,
    () => HERO_POOL_MAKER_STATE.LOADING_HERO_MATCHUPS,
  )
  .handleAction(
    actions.LOAD_HERO_MATCHUPS.success,
    () => HERO_POOL_MAKER_STATE.LOADED_HERO_MATCHUPS,
  )
  .handleAction(
    actions.LOAD_COUNTER_MATCHUPS.request,
    () => HERO_POOL_MAKER_STATE.LOADING_COUNTER_MATCHUPS,
  )
  .handleAction(
    actions.LOAD_COUNTER_MATCHUPS.success,
    () => HERO_POOL_MAKER_STATE.LOADED_COUNTER_MATCHUPS,
  );

export const counterMatchupsReducer = createReducer(
  {} as actions.HeroMatchupMap,
)
  .handleAction(actions.LOAD_COUNTER_MATCHUPS.request, () => ({}))
  .handleAction(actions.LOAD_COUNTER_MATCHUPS.success, (state, action) => ({
    ...state,
    ...action.payload,
  }));
