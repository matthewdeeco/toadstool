import { QuestionCircleFilled } from '@ant-design/icons';
import { Tooltip, Checkbox } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useState, useEffect } from 'react';
import { useResponsive } from 'react-hooks-responsive';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { HeroMatchupMap } from '../actions';
import { Hero } from '../models/hero';
import { HeroMatchup } from '../models/hero-matchup';

import AppTable from './AppTable';
import MatchupIndicator from './MatchupIndicator';

const HeroMatchupAvatar = styled.img`
  height: 24px;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
`;

const HeroMatchupsTable: React.FC<{
  rowHeroIds: Hero['id'][];
  colHeroIds: Hero['id'][];
  heroes: Record<Hero['id'], Hero>;
  heroMatchups: HeroMatchupMap;
  onSelectHeroes?: (selectedHeroIds: Hero['id'][]) => void;
  flipValues?: boolean;
}> = ({
  rowHeroIds,
  colHeroIds,
  heroes,
  heroMatchups,
  onSelectHeroes,
}) => {
  const [showValues, setShowValues] = useState(false);
  const [selectedHeroIds, setSelectedHeroIds] = useState([] as Hero['id'][]);

  useEffect(() => {
    setSelectedHeroIds([]);
  }, [colHeroIds]);

  useEffect(() => {
    if (onSelectHeroes) {
      onSelectHeroes(selectedHeroIds);
    }
  }, [selectedHeroIds, onSelectHeroes]);

  const tableRecords = rowHeroIds.map((enemyId) => {
    const matchups: { [allyId: string]: HeroMatchup } = {};
    ['summary', ...colHeroIds].forEach((allyId) => {
      matchups[allyId] = heroMatchups[allyId]?.[enemyId];
    });
    return {
      key: enemyId,
      ...heroes[enemyId],
      matchups,
    };
  });

  const disadvantageTitle = useResponsive({ short: 0, long: 1280 });
  const shouldIncludeSummary = colHeroIds?.length > 1;

  const columns = [
    ...(shouldIncludeSummary ? ['summary'] : []),
    ...colHeroIds,
  ].reduce<ColumnsType<typeof tableRecords[0]>>(
    (accumulator, heroId) => {
      const isSummary = heroId === 'summary';
      const heroName = isSummary ? 'Overall' : heroes[heroId]?.name || '';
      return [
        ...accumulator,
        {
          key: heroId,
          title: (
            <span>
              <HeroMatchupAvatar src={heroes[heroId]?.imageUrl} />
              {heroName}
            </span>
          ),
          children: [
            {
              key: `${heroId}.disadvantage`,
              dataIndex: ['matchups', heroId, 'disadvantage'],
              title: (
                <span>
                  {disadvantageTitle.size === 'long' ? 'Disadvantage' : 'Dis.'}
                  &nbsp;
                  <Tooltip
                    overlayStyle={{ fontSize: '12px' }}
                    placement="bottom"
                    title="Advantage measures the matchup between two heroes regardless of their normal win rate. It is calculated by establishing their win rates both in and outside of the matchup and comparing the difference against a base win rate. The calculation is procedural and advantage / disadvantage results are not designed to be symmetrical."
                  >
                    <QuestionCircleFilled />
                  </Tooltip>
                </span>
              ),
              align: 'right',
              defaultSortOrder:
                isSummary || !shouldIncludeSummary ? 'ascend' : undefined,
              render: (disadvantage: number, hero) =>
                showValues ? (
                  disadvantage ? (
                    `${disadvantage.toFixed(2)}%`
                  ) : (
                    ''
                  )
                ) : (
                  <MatchupIndicator
                    value={hero.matchups[heroId]?.disadvantageTier}
                    isHigherBetter={false}
                  ></MatchupIndicator>
                ),
              sorter: (a, b) =>
                (b.matchups[heroId]?.disadvantage ?? 0) -
                (a.matchups[heroId]?.disadvantage ?? 0),
            },
            {
              key: `${heroId}.winRate`,
              dataIndex: ['matchups', heroId, 'winRate'],
              title: 'Win Rate',
              align: 'right',
              render: (winRate: number, hero) =>
                showValues ? (
                  winRate ? (
                    `${winRate.toFixed(2)}%`
                  ) : (
                    ''
                  )
                ) : (
                  <MatchupIndicator
                    value={hero.matchups[heroId]?.winRateTier}
                  ></MatchupIndicator>
                ),
              sorter: (a, b) =>
                a.matchups[heroId]?.winRate - b.matchups[heroId]?.winRate,
            },
            isSummary || !shouldIncludeSummary
              ? {
                  key: `${heroId}.matchesPlayed`,
                  dataIndex: ['matchups', heroId, 'matchesPlayed'],
                  title: 'Matches Played',
                  align: showValues ? 'right' : 'left',
                  render: (matchesPlayed: number, hero) =>
                    showValues
                      ? matchesPlayed?.toLocaleString()
                      : Array.from(
                          { length: hero.matchups[heroId]?.matchesPlayedTier },
                          (v, i) => (
                            <img
                              key={i}
                              src={hero.iconUrl}
                              alt=""
                              height="18px"
                            />
                          ),
                        ),
                  sorter: (a, b) =>
                    (a.matchups[heroId]?.matchesPlayed ?? 0) -
                    (b.matchups[heroId]?.matchesPlayed ?? 0),
                }
              : {},
          ],
        },
      ];
    },
    [
      {
        key: 'name',
        dataIndex: 'name',
        title: 'Hero',
        fixed: 'left',
        render: (name: string, hero) => (
          <div style={{ whiteSpace: 'nowrap' }}>
            {onSelectHeroes && (
              <Checkbox
                checked={selectedHeroIds.includes(hero.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedHeroIds([...selectedHeroIds, hero.id]);
                  } else {
                    setSelectedHeroIds(
                      selectedHeroIds.filter((heroId) => heroId !== hero.id),
                    );
                  }
                }}
              ></Checkbox>
            )}
            <HeroMatchupAvatar src={hero.imageUrl} alt="" />
            <Link to={`/heroes/${hero.id}`} target="_blank">
              {name}
            </Link>
          </div>
        ),
        align: 'left',
      },
    ],
  );

  return (
    <div>
      <Checkbox
        style={{ color: 'unset' }}
        onChange={(e) => setShowValues(e.target.checked)}
      >
        Show actual values
      </Checkbox>
      {JSON.stringify(selectedHeroIds)}
      <AppTable
        dataSource={tableRecords}
        columns={columns as ColumnsType<object>}
      ></AppTable>
    </div>
  );
};

export default HeroMatchupsTable;
