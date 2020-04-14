import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Hero } from '../models/hero';

import HeroAvatar from './HeroAvatar';

const HeroLink = styled(Link)`
  position: relative;
  flex: 0 1 auto;
  display: inline-flex;
  margin: 2px;
`;

const HeroName = styled.span`
  position: absolute;
  left: 0.25rem;
  bottom: 0.25rem;
  color: white;
  text-shadow: 0px 0px 4px #0a0a0a;
  font-size: 13px;
  z-index: 2;
`;

const HeroMask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: inset 0px 0px 20px 0 #bababa;
  top: 0;
  left: 0;
  z-index: 1;
`;

const HeroCard = ({ hero, className }: { hero: Hero, className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <HeroLink
      to={`/heroes/${hero.id}`}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HeroAvatar name={hero.localized_name} url={hero.img}></HeroAvatar>
      <HeroName>{hero.localized_name}</HeroName>
      {isHovered && <HeroMask />}
    </HeroLink>
  );
};

export default HeroCard;
