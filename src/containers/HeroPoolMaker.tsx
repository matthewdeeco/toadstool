import { QuestionCircleFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useState, useEffect } from 'react';
import { useResponsive } from 'react-hooks-responsive';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'typesafe-actions';

import { loadHeroMatchups } from '../actions';
import AppTable from '../components/AppTable';
import HeroPicker from '../components/HeroPicker';
import { Hero } from '../models/hero';
import { HeroMatchup } from '../models/hero-matchup';

function mapStateToProps(state: RootState) {
  return {
    heroes: state.heroes,
    heroIds: state.heroIds,
    heroMatchups: state.heroMatchups,
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type HeroPoolMakerProps = PropsFromRedux & {};

const InstructionsList = styled.ol`
  counter-reset: item;
  margin-left: 0;
  padding-left: 0;

  li {
    counter-increment: item;
    list-style: none inside;
    margin: 1rem 0 0.5rem 0;
    &:before {
      content: counter(item);
      align-items: center;
      border: 1px #ccc solid;
      border-radius: 50%;
      display: inline-flex;
      justify-content: center;
      margin: 0.5rem 1rem 0 0;
      width: 2rem;
      min-width: 2rem;
      height: 2rem;
    }
  }
`;

const HeroMatchupAvatar = styled.img`
  height: 24px;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
`;

const HeroPoolMaker: React.FC<HeroPoolMakerProps> = ({
  heroIds,
  heroes,
  heroMatchups,
}) => {
  const [heroPoolIds, setHeroPoolIds] = useState([] as Hero['id'][]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (heroPoolIds?.length > 0) {
      dispatch(loadHeroMatchups(heroPoolIds));
    }
  }, [heroPoolIds, dispatch]);

  const tableRecords = heroIds.map((enemyId) => {
    const matchups: { [allyId: string]: HeroMatchup } = {};
    ['summary', ...heroPoolIds].forEach((allyId) => {
      matchups[allyId] = heroMatchups[allyId]?.[enemyId];
    });
    return {
      key: enemyId,
      ...heroes[enemyId],
      matchups,
    };
  });

  const disadvantageTitle = useResponsive({ short: 0, long: 1280 });
  const shouldIncludeSummary = heroPoolIds?.length > 1;

  const columns = [
    ...(shouldIncludeSummary ? ['summary'] : []),
    ...heroPoolIds,
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
              defaultSortOrder: isSummary ? 'descend' : undefined,
              render: (disadvantage: number) =>
                disadvantage ? `${disadvantage.toFixed(2)}%` : '',
              sorter: (a, b) =>
                a.matchups[heroId]?.disadvantage -
                b.matchups[heroId]?.disadvantage,
            },
            {
              key: `${heroId}.matchesPlayed`,
              dataIndex: ['matchups', heroId, 'matchesPlayed'],
              title: 'Matches Played',
              align: 'right',
              render: (matchesPlayed: number) =>
                matchesPlayed?.toLocaleString(),
            },
            {
              key: `${heroId}.winRate`,
              dataIndex: ['matchups', heroId, 'winRate'],
              title: 'Win Rate',
              align: 'right',
              render: (winRate: number) =>
                winRate ? `${winRate.toFixed(2)}%` : '',
            },
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
            <HeroMatchupAvatar src={hero.imageUrl} alt="" />
            {name}
          </div>
        ),
        align: 'left',
      },
    ],
  );

  return (
    <div>
      <h1>Dota 2 Hero Pool Maker</h1>
      <InstructionsList>
        <li>What is your current hero pool?</li>
        <HeroPicker
          heroIds={heroIds}
          heroes={heroes}
          onChange={setHeroPoolIds}
        />
        <li>
          Here are heroes that are good against your hero pool. Pick heroes that
          you want to counter.
        </li>
        {heroMatchups && Object.keys(heroMatchups).length > 0 && (
          <AppTable
            pagination={false}
            dataSource={tableRecords}
            columns={columns as ColumnsType<object>}
          ></AppTable>
        )}
        <li>You should start learning these heroes:</li>
      </InstructionsList>
    </div>
  );
};

export default connector(HeroPoolMaker);
