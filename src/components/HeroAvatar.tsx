import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width: 128px;
  height: 72px;
`;

const HeroAvatar = ({ name, imageUrl }: { name: string; imageUrl: string }) => {
  return <Image alt={name} src={imageUrl}></Image>;
};

export default HeroAvatar;
