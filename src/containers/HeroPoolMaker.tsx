import {  AutoComplete } from 'antd';
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'typesafe-actions';

import { Hero } from '../models/hero';

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

const HeroPicker: React.FC<{ heroes: Hero[] }> = ({ heroes }) => {
  const [search, setSearch] = useState('');
  const [heroIds, setHeroIds] = useState([] as Hero['id'][]);

  return (
    <div>
      {heroIds.join(', ')}
      <AutoComplete
        value={search}
        backfill={true}
        style={{ width: '100%' }}
        placeholder="Enter a hero name..."
        filterOption={(inputValue, option) => {
          console.log(inputValue, option);
          return option
            ? option.value.toLowerCase().indexOf(inputValue.toLowerCase()) !==
                -1
            : false;
        }}
        onSearch={(searchText) => {
          setSearch(searchText);
        }}
        onSelect={(heroName, option) => {
          setHeroIds([...heroIds, option.key as Hero['id']]);
          setSearch('');
        }}
      >
        {heroes
          .filter((hero) => !heroIds.includes(hero.id))
          .filter((hero) =>
            search
              ? hero.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
              : true,
          )
          .map((hero) => (
            <AutoComplete.Option key={hero.id} value={hero.name}>
              <img
                height="32px"
                style={{ marginRight: '0.5rem' }}
                src={hero.imageUrl}
                alt=""
              />
              {hero.name}
            </AutoComplete.Option>
          ))}
      </AutoComplete>
    </div>
  );
};

const HeroPoolMaker: React.FC<HeroPoolMakerProps> = ({ heroIds, heroes }) => {
  return (
    <div>
      <h1>Dota 2 Hero Pool Maker</h1>
      <InstructionsList>
        <li>What is your current hero pool?</li>
        <HeroPicker heroes={heroIds?.map((heroId) => heroes[heroId])} />
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
