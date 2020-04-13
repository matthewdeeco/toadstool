import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Hero } from '../models/hero';

import HeroAvatar from './HeroAvatar';

const HeroLink = styled(Link)`
  position: relative;
  flex: 0 1 auto;
  display: inline-flex;
`;

const HeroName = styled.span`
  position: absolute;
  left: 0.25rem;
  bottom: 0.25rem;
  color: white;
  text-shadow: 0px 0px 4px #0a0a0a;
  font-size: 13px;
`;

const HeroCard = ({ hero }: { hero: Hero }) => (
  <HeroLink to={`/heroes/${hero.id}`}>
    <HeroAvatar name={hero.localized_name} url={hero.img}></HeroAvatar>
    <HeroName>{hero.localized_name}</HeroName>
  </HeroLink>
);

export default HeroCard;
