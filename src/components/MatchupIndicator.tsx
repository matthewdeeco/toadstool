import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  font-size: 16px;
`;

const MatchupIndicator: React.FC<{
  value: number;
  useColor?: boolean;
  isHigherBetter?: boolean;
}> = ({ value, useColor = true, isHigherBetter = true }) => {
  const numArrows = Math.abs(value);
  const isValuePositive = value > 0;
  const color = useColor
    ? isValuePositive === isHigherBetter
      ? '#20fc8f'
      : '#ff5964'
    : undefined;
  if (value > 0) {
    return (
      <StyledSpan style={{ color }}>{'\u25b4'.repeat(numArrows)}</StyledSpan>
    );
  } else {
    return (
      <StyledSpan style={{ color }}>{'\u25be'.repeat(numArrows)}</StyledSpan>
    );
  }
};

export default MatchupIndicator;
