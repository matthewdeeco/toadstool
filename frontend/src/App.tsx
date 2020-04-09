import React, { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Hero from './containers/HeroPage';
import HeroList from './containers/HeroList';
import { loadHeroes } from './actions';
import './App.scss';

const history = createBrowserHistory();

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHeroes());
  }, [dispatch]);

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
