import { Dispatch } from "redux";
import Axios from "axios";
import { Hero } from "./models/hero";
import { createAsyncAction } from "typesafe-actions";

export const LOAD_HEROES = createAsyncAction(
  'LOAD_HEROES_REQUEST',
  'LOAD_HEROES_SUCCESS',
  'LOAD_HEROES_FAILURE'
)<void, Hero[], Error>();

export const loadHeroes = () => {
  return (dispatch: Dispatch) => {
    dispatch(LOAD_HEROES.request());
     Axios.get<Hero[]>('https://api.opendota.com/api/constants/heroes').then((resp) => {
       dispatch(LOAD_HEROES.success(Object.values(resp.data)));
    })
    .catch((error) => {
      dispatch(LOAD_HEROES.failure(error));
    });
  }
};
