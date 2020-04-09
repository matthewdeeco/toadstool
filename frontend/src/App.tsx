import React from 'react';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';

import Hero from './containers/HeroPage';
import HeroList from './containers/HeroList';
import './App.scss';

const history = createBrowserHistory();

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <HeroList />
        </Route>
        <Route path="/heroes/:heroId">
          <Hero />
        </Route>
      </Switch>
    </Router>
  );
}
