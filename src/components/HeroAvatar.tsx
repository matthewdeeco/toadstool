import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const Image = styled.img`
  height: 48px;
  ${breakpoint('desktop')`
    height: 72px;
  `}
`;

const HeroAvatar = ({ name, imageUrl }: { name: string; imageUrl: string }) => {
  return <Image alt={name} src={imageUrl}></Image>;
};

export default HeroAvatar;
