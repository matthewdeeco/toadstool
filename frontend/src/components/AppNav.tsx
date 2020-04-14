import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { SCREEN_MD_MAX } from '../constants/breakpoints';

const navbarItemHeight = '2rem';

const Container = styled.div`
  background-color: #242f39;
  position: relative;
  color: white;
`;

const NavLinkContainer = styled.div`
  display: flex;
  height: calc(100% - 4px);
  padding-top: 4px;
  align-items: center;

  max-width: ${SCREEN_MD_MAX};
  margin: 0 auto;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  height: ${navbarItemHeight};
  padding: 0.5rem 0.75rem 0;
  margin: 0 4px;
  vertical-align: bottom;
  border-radius: 0.5rem 0.5rem 0 0;
  color: white;
  &.active {
    background-color: #2e3740;
  }
  &:not(.active) {
    &:hover,
    &:focus {
      color: #39cccc;
    }
  }
`;

export const AppNav = () => {
  return (
    <Container>
      <NavLinkContainer>
        <StyledNavLink to="/heroes">Heroes</StyledNavLink>
        <StyledNavLink to="/hero-pool">Hero Pool Suggestion</StyledNavLink>
      </NavLinkContainer>
    </Container>
  );
};
