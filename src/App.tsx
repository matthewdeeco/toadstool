import { createBrowserHistory } from 'history';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { loadHeroes } from './actions';
import { AppNav } from './components/AppNav';
import { SCREEN_MD_MAX } from './constants/breakpoints';
import HeroList from './containers/HeroList';
import Hero from './containers/HeroPage';
import HeroPoolMaker from './containers/HeroPoolMaker';
import './App.scss';

const history = createBrowserHistory();

const ScrollContainer = styled.div`
  overflow-y: auto;
`;

const PageContainer = styled.div`
  color: white;
  max-width: ${SCREEN_MD_MAX};
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHeroes());
  }, [dispatch]);

  return (
    <Router history={history}>
      <AppNav />
      <ScrollContainer>
        <PageContainer>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/heroes" />
            </Route>
            <Route path="/heroes" exact component={HeroList}></Route>
            <Route path="/heroes/:heroId" component={Hero}></Route>
            <Route path="/hero-pool" component={HeroPoolMaker}></Route>
          </Switch>
        </PageContainer>
      </ScrollContainer>
    </Router>
  );
}
