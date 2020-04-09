import React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { Hero } from '../models/hero';
import HeroCard from '../components/HeroCard';
import styled from 'styled-components';

const HeroListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: white;
  justify-content: center;
  max-width: 972px;
  margin: 0 auto;
`;

const HeroList = ({ heroes }: { heroes: Hero[]}) => {
  return (
    <HeroListContainer>
      {heroes?.map(hero => <HeroCard key={hero.id} hero={hero}></HeroCard>)}
    </HeroListContainer>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    heroes: state.heroes
  }
}

export default connect(mapStateToProps)(HeroList);
