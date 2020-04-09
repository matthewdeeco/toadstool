import React, { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Hero from './containers/HeroPage';
import HeroList from './containers/HeroList';
import { loadHeroes } from './actions';
import './App.scss';
import styled from 'styled-components';

const history = createBrowserHistory();

const PageContainer = styled.div`
  color: white;
  max-width: 972px;
  margin: 0 auto;
`;

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHeroes());
  }, [dispatch]);

  return (
    <PageContainer>
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/heroes" />
          </Route>
          <Route path="/heroes" exact component={HeroList}></Route>
          <Route path="/heroes/:heroId" component={Hero}></Route>
        </Switch>
      </Router>
    </PageContainer>
  );
}
