import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from 'typesafe-actions';

import HeroCard from '../components/HeroCard';
import { Hero } from '../models/hero';

function mapStateToProps(state: RootState) {
  return {
    heroes: state.heroes,
    heroIds: state.heroIds,
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type HeroListProps = PropsFromRedux & {};

const HeroListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const HeroList: React.FC<HeroListProps> = ({ heroes, heroIds }) => {
  const history = useHistory();
  return (
    <HeroListContainer>
      {heroIds?.map((heroId) => (
        <HeroCard
          key={heroId}
          hero={heroes[heroId]}
          onClick={(hero: Hero) => history.push(`/heroes/${hero.id}`)}
        ></HeroCard>
      ))}
    </HeroListContainer>
  );
};

export default connector(HeroList);
