import { AutoComplete, Tag } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Hero } from '../models/hero';

const HeroTag = styled(Tag)`
  padding-left: 0;
  margin-top: 0.5rem;
  border: none;
  img {
    margin-right: 0.25rem;
  }
`;

const HeroPicker: React.FC<{
  heroIds: Hero['id'][];
  heroes: Record<Hero['id'], Hero>;
}> = ({ heroIds, heroes }) => {
  const [search, setSearch] = useState('');
  const [selectedHeroIds, setSelectedHeroIds] = useState([] as Hero['id'][]);

  return (
    <div>
      <AutoComplete
        value={search}
        backfill={true}
        style={{ width: '100%' }}
        placeholder="Enter a hero name..."
        onSearch={(searchText) => {
          setSearch(searchText);
        }}
        onSelect={(heroName, option) => {
          console.log(selectedHeroIds, option.key);
          setSelectedHeroIds([...selectedHeroIds, option.key as Hero['id']]);
          setSearch('');
        }}
      >
        {heroIds
          .filter((heroId) => !selectedHeroIds.includes(heroId))
          .map((heroId) => heroes[heroId])
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

      {selectedHeroIds
        .map((heroId) => heroes[heroId])
        .map((hero) => (
          <HeroTag
            key={hero.id}
            closable
            onClose={() => {
              setSelectedHeroIds(
                selectedHeroIds.filter((heroId) => heroId !== hero.id),
              );
            }}
          >
            <img src={hero.imageUrl} height="24px" alt="" /> {hero.name}
          </HeroTag>
        ))}
    </div>
  );
};

export default HeroPicker;
