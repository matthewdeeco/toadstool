
import styled from 'styled-components';
import React from 'react';

const Image = styled.img`
  width: 128px;
  height: 72px;
`;

const HeroAvatar = ({ name, url }: { name: string; url: string }) => {
  return <Image alt={name} src={`https://api.opendota.com${url}`}></Image>;
};

export default HeroAvatar;
