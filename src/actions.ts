import Axios from 'axios';
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

export const LOAD_HERO_MATCHUPS = createAsyncAction(
  'LOAD_HERO_MATCHUPS_REQUEST',
  'LOAD_HERO_MATCHUPS_SUCCESS',
  'LOAD_HERO_MATCHUPS_FAILURE',
)<Hero['id'], { heroId: Hero['id']; matchups: HeroMatchup[] }, Error>();

export const loadHeroMatchups = (heroId: Hero['id']) => {
  return (dispatch: Dispatch): void => {
    dispatch(LOAD_HERO_MATCHUPS.request(heroId));
    Axios.get<HeroMatchup[]>('/api/hero-counters', { params: { hero: heroId } })
      .then((resp) => {
        dispatch(LOAD_HERO_MATCHUPS.success({ heroId, matchups: resp.data }));
      })
      .catch((error) => {
        dispatch(LOAD_HERO_MATCHUPS.failure(error));
      });
  };
};
