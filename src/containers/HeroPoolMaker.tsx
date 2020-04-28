import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'typesafe-actions';

import { loadHeroMatchups } from '../actions';
import HeroMatchupsTable from '../components/HeroMatchupsTable';
import HeroPicker from '../components/HeroPicker';
import { Hero } from '../models/hero';

function mapStateToProps(state: RootState) {
  return {
    heroes: state.heroes,
    heroIds: state.heroIds,
    heroMatchups: state.heroMatchups,
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type HeroPoolMakerProps = PropsFromRedux & {};

const InstructionsList = styled.ol`
  counter-reset: item;
  margin-left: 0;
  padding-left: 0;
`;

const InstructionsListItem = styled.li`
  counter-increment: item;
  list-style: none inside;
  margin: 1rem 0 0.5rem 0;
  :before {
    content: counter(item);
    align-items: center;
    border: 1px #ccc solid;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    margin: 0.5rem 1rem 0 0;
    width: 2rem;
    min-width: 2rem;
    height: 2rem;
  }
`;

const HeroPoolMaker: React.FC<HeroPoolMakerProps> = ({
  heroIds,
  heroes,
  heroMatchups,
}) => {
  const [heroPoolIds, setHeroPoolIds] = useState([] as Hero['id'][]);
  const [counterHeroIds, setCounterHeroIds] = useState([] as Hero['id'][]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (heroPoolIds?.length > 0) {
      dispatch(loadHeroMatchups(heroPoolIds));
    }
  }, [heroPoolIds, dispatch]);

  useEffect(() => {
    if (counterHeroIds?.length > 0) {
      dispatch(loadHeroMatchups(counterHeroIds));
    }
  }, [counterHeroIds, dispatch]);

  return (
    <div>
      <h1>Dota 2 Hero Pool Maker</h1>
      <InstructionsList>
        <InstructionsListItem>
          What is your current hero pool?
        </InstructionsListItem>
        <HeroPicker
          heroIds={heroIds}
          heroes={heroes}
          onChange={setHeroPoolIds}
        />
        <InstructionsListItem>
          Here are heroes that are good against your hero pool. Pick heroes that
          you want to counter.
        </InstructionsListItem>

        {heroMatchups && Object.keys(heroMatchups).length > 0 && (
          <HeroMatchupsTable
            rowHeroIds={heroIds}
            colHeroIds={heroPoolIds}
            heroes={heroes}
            heroMatchups={heroMatchups}
            onSelectHeroes={setCounterHeroIds}
          />
        )}
        <InstructionsListItem>
          You should start learning these heroes:
        </InstructionsListItem>

        {heroMatchups && Object.keys(heroMatchups).length > 0 && (
          <HeroMatchupsTable
            rowHeroIds={heroIds}
            colHeroIds={counterHeroIds}
            heroes={heroes}
            heroMatchups={heroMatchups}
            flipValues={true}
          />
        )}
      </InstructionsList>
    </div>
  );
};

export default connector(HeroPoolMaker);
