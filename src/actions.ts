import Axios from 'axios';
import qs from 'qs';
import { Dispatch } from 'redux';
import { createAsyncAction } from 'typesafe-actions';

import { Hero } from './models/hero';
import { HeroMatchup } from './models/hero-matchup';

export const LOAD_HEROES = createAsyncAction(
  'LOAD_HEROES_REQUEST',
  'LOAD_HEROES_SUCCESS',
  'LOAD_HEROES_FAILURE',
)<void, Hero[], Error>();

export const loadHeroes = () => {
  return (dispatch: Dispatch): void => {
    dispatch(LOAD_HEROES.request());
    Axios.get<Hero[]>('/api/heroes')
      .then((resp) => {
        dispatch(LOAD_HEROES.success(resp.data));
      })
      .catch((error) => {
        dispatch(LOAD_HEROES.failure(error));
      });
  };
};

export type HeroMatchupMap = {
  [heroId: string]: {
    [enemyId: string]: HeroMatchup;
  };
};

export const LOAD_HERO_MATCHUPS = createAsyncAction(
  'LOAD_HERO_MATCHUPS_REQUEST',
  'LOAD_HERO_MATCHUPS_SUCCESS',
  'LOAD_HERO_MATCHUPS_FAILURE',
)<Hero['id'][], HeroMatchupMap, Error>();

export const loadHeroMatchups = (heroIds: Hero['id'][]) => {
  return (dispatch: Dispatch): void => {
    dispatch(LOAD_HERO_MATCHUPS.request(heroIds));
    Axios.get<HeroMatchupMap>('/api/hero-counters', {
      params: { heroIds },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    })
      .then((resp) => {
        dispatch(LOAD_HERO_MATCHUPS.success(resp.data));
      })
      .catch((error) => {
        dispatch(LOAD_HERO_MATCHUPS.failure(error));
      });
  };
};

export const LOAD_COUNTER_MATCHUPS = createAsyncAction(
  'LOAD_COUNTER_MATCHUPS_REQUEST',
  'LOAD_COUNTER_MATCHUPS_SUCCESS',
  'LOAD_COUNTER_MATCHUPS_FAILURE',
)<Hero['id'][], HeroMatchupMap, Error>();

export const loadCounterMatchups = (heroIds: Hero['id'][]) => {
  return (dispatch: Dispatch): void => {
    dispatch(LOAD_COUNTER_MATCHUPS.request(heroIds));
    Axios.get<HeroMatchupMap>('/api/hero-counters', {
      params: { heroIds },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    })
      .then((resp) => {
        dispatch(LOAD_COUNTER_MATCHUPS.success(resp.data));
      })
      .catch((error) => {
        dispatch(LOAD_COUNTER_MATCHUPS.failure(error));
      });
  };
};
