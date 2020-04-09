import * as actions from "./actions";
import { ActionType, getType, createReducer } from "typesafe-actions";
import { Hero } from "./models/hero";

const initialState = {};

export default function toadstoolApp(state = initialState, action: any) {
  switch (action.type) {
    case actions.LOAD_HEROES_SUCCESS:
      return {
        ...state,
        heroes: action.payload.sort((hero1: Hero, hero2: Hero) => (hero1.localized_name < hero2.localized_name) ? -1 : 1),
      };
  }
  return state;
}