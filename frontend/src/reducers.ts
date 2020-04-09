import * as actions from "./actions";
import { ActionType, getType, createReducer } from "typesafe-actions";

const initialState = {};

export default function toadstoolApp(state = initialState, action: ActionType<typeof actions>) {
  switch (action.type) {
    case getType(actions.LOAD_HEROES.success):
      return {
        ...state,
        heroes: action.payload.sort((hero1, hero2) => (hero1.localized_name < hero2.localized_name) ? -1 : 1),
      };
  }
  return state;
}