import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Hero } from '../models/hero';

const HeroLink = styled(Link)`
  position: relative;
  flex: 0 1 auto;
  display: inline-flex;
`;

const HeroImage = styled.img`
  width: 128px;
  height: 72px;
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
    <HeroImage alt={hero.localized_name} src={'https://api.opendota.com' + hero.img}></HeroImage>
    <HeroName>{hero.localized_name}</HeroName>
  </HeroLink>
);

export default HeroCard;
