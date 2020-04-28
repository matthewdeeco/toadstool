import React from 'react';

const MatchupIndicator: React.FC<{
  value: number;
  useColor?: boolean;
  isHigherBetter?: boolean;
}> = ({ value, useColor = true, isHigherBetter = true }) => {
  const numArrows = Math.abs(value);
  const isValuePositive = value > 0;
  const color = useColor
    ? isValuePositive === isHigherBetter
      ? 'green'
      : 'red'
    : undefined;
  if (value > 0) {
    return <span style={{ color }}>{'\u25b4'.repeat(numArrows)}</span>;
  } else {
    return <span style={{ color }}>{'\u25be'.repeat(numArrows)}</span>;
  }
};

export default MatchupIndicator;
