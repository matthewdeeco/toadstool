import Axios from 'axios';
import { Dispatch } from 'redux';
import { createAsyncAction } from 'typesafe-actions';

import { Hero } from './models/hero';

export const LOAD_HEROES = createAsyncAction(
  'LOAD_HEROES_REQUEST',
  'LOAD_HEROES_SUCCESS',
  'LOAD_HEROES_FAILURE',
)<void, Hero[], Error>();

export const loadHeroes = () => {
  return (dispatch: Dispatch): void => {
    dispatch(LOAD_HEROES.request());
    Axios.get<Hero[]>('https://api.opendota.com/api/constants/heroes')
      .then((resp) => {
        dispatch(LOAD_HEROES.success(Object.values(resp.data)));
      })
      .catch((error) => {
        dispatch(LOAD_HEROES.failure(error));
      });
  };
};
