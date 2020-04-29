import { LoadingOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'typesafe-actions';

import { loadHeroMatchups, loadCounterMatchups } from '../actions';
import HeroMatchupsTable from '../components/HeroMatchupsTable';
import HeroPicker from '../components/HeroPicker';
import { Hero } from '../models/hero';
import { HERO_POOL_MAKER_STATE } from '../reducers/hero-pool-maker';

function mapStateToProps(state: RootState) {
  return {
    heroes: state.heroes,
    heroIds: state.heroIds,
    heroMatchups: state.heroMatchups,
    counterMatchups: state.counterMatchups,
    heroPoolMakerState: state.heroPoolMakerState,
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
  font-size: 1.25rem;

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
  counterMatchups,
  heroPoolMakerState,
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
      dispatch(loadCounterMatchups(counterHeroIds));
    }
  }, [counterHeroIds, dispatch]);

  return (
    <div>
      <h1>Dota 2 Hero Pool Maker</h1>
      <InstructionsList>
        {heroPoolMakerState >= HERO_POOL_MAKER_STATE.LOADED_HEROES && (
          <div>
            <InstructionsListItem>
              What is your current hero pool?
            </InstructionsListItem>
            <HeroPicker
              heroIds={heroIds}
              heroes={heroes}
              onChange={setHeroPoolIds}
            />
          </div>
        )}

        {heroPoolMakerState >= HERO_POOL_MAKER_STATE.LOADED_HERO_MATCHUPS && (
          <div>
            <InstructionsListItem>
              Here are heroes that are good against your hero pool. Pick heroes
              that you want to counter.
            </InstructionsListItem>

            <HeroMatchupsTable
              rowHeroIds={heroIds}
              colHeroIds={heroPoolIds}
              heroes={heroes}
              heroMatchups={heroMatchups}
              onSelectHeroes={setCounterHeroIds}
            />
          </div>
        )}

        {heroPoolMakerState >=
          HERO_POOL_MAKER_STATE.LOADED_COUNTER_MATCHUPS && (
          <div>
            <InstructionsListItem>
              You should start learning these heroes:
            </InstructionsListItem>

            <HeroMatchupsTable
              rowHeroIds={heroIds}
              colHeroIds={counterHeroIds}
              heroes={heroes}
              heroMatchups={counterMatchups}
              flipValues={true}
            />
          </div>
        )}
      </InstructionsList>
      {heroPoolMakerState === HERO_POOL_MAKER_STATE.LOADING_HEROES && (
        <LoadingOutlined />
      )}
      {heroPoolMakerState === HERO_POOL_MAKER_STATE.LOADING_HERO_MATCHUPS && (
        <LoadingOutlined />
      )}
      {heroPoolMakerState ===
        HERO_POOL_MAKER_STATE.LOADING_COUNTER_MATCHUPS && <LoadingOutlined />}
    </div>
  );
};

export default connector(HeroPoolMaker);
