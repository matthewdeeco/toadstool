import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'typesafe-actions';

import HeroPicker from '../components/HeroPicker';

function mapStateToProps(state: RootState) {
  return {
    heroes: state.heroes,
    heroIds: state.heroIds,
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type HeroPoolMakerProps = PropsFromRedux & {};

const InstructionsList = styled.ol`
  counter-reset: item;
  margin-left: 0;
  padding-left: 0;

  li {
    counter-increment: item;
    list-style: none inside;
    margin: 1rem 0 0.5rem 0;
    &:before {
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
  }
`;

const HeroPoolMaker: React.FC<HeroPoolMakerProps> = ({ heroIds, heroes }) => {
  return (
    <div>
      <h1>Dota 2 Hero Pool Maker</h1>
      <InstructionsList>
        <li>What is your current hero pool?</li>
        <HeroPicker heroIds={heroIds} heroes={heroes} />
        <li>
          Here are heroes that are good against your hero pool. Pick heroes that
          you want to counter.
        </li>
        <li>You should start learning these heroes:</li>
      </InstructionsList>
    </div>
  );
};

export default connector(HeroPoolMaker);
