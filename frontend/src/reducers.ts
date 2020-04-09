import * as actions from "./actions";
import { createReducer } from "typesafe-actions";
import { Hero } from "./models/hero";
import { combineReducers } from "redux";

const heroesReducer = createReducer([] as Hero[])
  .handleAction(actions.LOAD_HEROES.success, (state, action) => action.payload.sort((hero1, hero2) => (hero1.localized_name < hero2.localized_name) ? -1 : 1));

const rootReducer = combineReducers({
  heroes: heroesReducer,
});

export default rootReducer;
