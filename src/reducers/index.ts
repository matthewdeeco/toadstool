import { heroesReducer, heroIdsReducer } from "./heroes";
import { heroMatchupsReducer, counterMatchupsReducer, heroPoolMakerStateReducer } from "./hero-pool-maker";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  heroes: heroesReducer,
  heroIds: heroIdsReducer,
  heroMatchups: heroMatchupsReducer,
  counterMatchups: counterMatchupsReducer,
  heroPoolMakerState: heroPoolMakerStateReducer,
});

export default rootReducer;
