import { Tag } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { Hero } from '../models/hero';


const StyledTag = styled(Tag)`
  padding-left: 0;
  margin-top: 0.5rem;
  border: none;
  img {
    margin-right: 0.25rem;
  }
`;

const HeroTag: React.FC<{ hero: Hero; onClose: () => void }> = ({
  hero,
  onClose,
}) => {
  return (
    <StyledTag key={hero.id} closable onClose={onClose}>
      <img src={hero.imageUrl} height="24px" alt="" /> {hero.name}
    </StyledTag>
  );
};

export default HeroTag;
