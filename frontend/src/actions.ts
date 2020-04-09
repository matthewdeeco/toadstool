import { Dispatch } from "redux";
import Axios from "axios";
import { Hero } from "./models/hero";

export const LOAD_HEROES_REQUEST = 'LOAD_HEROES_REQUEST';
export const LOAD_HEROES_SUCCESS = 'LOAD_HEROES_SUCCESS';
export const LOAD_HEROES_FAILURE = 'LOAD_HEROES_FAILURE';

export function fetchHeroes() {
  return function (dispatch: Dispatch) {
    dispatch({ type: LOAD_HEROES_REQUEST });
     Axios.get<Hero[]>('https://api.opendota.com/api/constants/heroes').then((resp) => {
       dispatch({ type: LOAD_HEROES_SUCCESS, payload: Object.values(resp.data) });
    })
    .catch((error) => {
      dispatch({ type: LOAD_HEROES_FAILURE, error });
    });
  }
}