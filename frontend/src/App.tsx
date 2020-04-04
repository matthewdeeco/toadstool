import React from 'react';
import './App.scss';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Hero from './HeroPage';
import HeroList from './HeroList';


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
