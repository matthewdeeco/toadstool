import React from 'react';
import styled from 'styled-components';

const InstructionsList = styled.ol`
  counter-reset: item;
  margin-left: 0;
  padding-left: 0;

  li {
    counter-increment: item;
    list-style: none inside;
    margin-bottom: 1rem;
    &:before {
      content: counter(item);
      align-items: center;
      border: 1px #ccc solid;
      border-radius: 50%;
      color: #ccc;
      display: inline-flex;
      justify-content: center;
      margin: 0.5rem 1rem 0 0;
      width: 2rem;
      min-width: 2rem;
      height: 2rem;
    }
  }
`;

const HeroPicker: React.FC<{}> = () => {
  return (
    <div>
      ahhaha
    </div>
  );
}

const HeroPoolMaker: React.FC<{}> = () => {
  return (
    <div>
      <h1>Dota 2 Hero Pool Maker</h1>
      <InstructionsList>
        <li>What is your current hero pool?</li>
        <HeroPicker />
        <li>Here are heroes that are good against your hero pool. Pick heroes that you want to counter.</li>
        <li>You should start learning these heroes:</li>
      </InstructionsList>
    </div>
  );
};

export default HeroPoolMaker;
