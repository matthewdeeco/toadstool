import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'typesafe-actions';

import HeroCard from '../components/HeroCard';
import { Hero } from '../models/hero';

const HeroListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const HeroList = ({ heroes }: { heroes: Hero[] }) => {
  return (
    <HeroListContainer>
      {heroes?.map((hero) => (
        <HeroCard key={hero.id} hero={hero}></HeroCard>
      ))}
    </HeroListContainer>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    heroes: state.heroes,
  };
};

export default connect(mapStateToProps)(HeroList);
