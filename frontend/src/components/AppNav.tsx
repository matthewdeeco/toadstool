import { NavLink } from "react-router-dom";
import React from 'react';
import styled from "styled-components";
import { SCREEN_MD_MAX } from "../constants/breakpoints";

const navbarItemHeight = '2rem';

const Container = styled.div`
  background-color: #242F39;
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

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  height: ${navbarItemHeight};
  padding: 0.5rem 0.75rem 0;
  margin: 0 4px;
  vertical-align: bottom;
  border-radius: 0.5rem 0.5rem 0 0;
  color: white;
  &.active {
    background-color: #2E3740;
  }
  &:not(.active) {
    &:hover, &:focus {
      color: #39CCCC;
    }
  }
`;

export const AppNav = () => {
  return (
    <Container>
      <NavLinkContainer>
        <NavLinkStyled to="/heroes">Heroes</NavLinkStyled>
        <NavLinkStyled to="/hero-pool">Hero Pool Suggestion</NavLinkStyled>
      </NavLinkContainer>
    </Container>
  );
};
