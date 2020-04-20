import { StateType, ActionType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type Store = StateType<typeof import('./index')>;

  export type RootState = StateType<typeof import('./reducers').default>;

  export type RootAction = ActionType<typeof import('./actions')>;

  interface Types {
    RootAction: RootAction;
  }
}
