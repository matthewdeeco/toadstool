import { QuestionCircleFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect } from 'react';
import { useResponsive } from 'react-hooks-responsive';
import { connect, useDispatch, ConnectedProps } from 'react-redux';
import { useParams, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from 'typesafe-actions';

import { loadHeroMatchups } from '../actions';
import AppTable from '../components/AppTable';
import HeroAvatar from '../components/HeroAvatar';

function mapStateToProps(
  state: RootState,
  ownProps: RouteComponentProps<{ heroId: string }>,
) {
  const heroId = ownProps?.match.params.heroId;
  return {
    hero: state.heroes[heroId],
    heroes: state.heroes,
    matchups: state.heroMatchups[heroId],
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type HeroPageProps = PropsFromRedux & {};

const HeroHeading = styled.div`
  display: flex;
  align-items: center;
`;

const HeroTitle = styled.div`
  display: inline-block;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  vertical-align: bottom;
`;

const HeroName = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const HeroMatchupAvatar = styled.img`
  height: 24px;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
`;

const DotabuffLink = styled.a`
  margin: 1rem 0;
  display: inline-block;
  img {
    width: 128px;
  }
`;

const StyledTable = styled(AppTable)`
  .ant-table-tbody > tr > td {
    padding-bottom: 0.25rem;
  }
`;

const HeroPage: React.FC<HeroPageProps> = ({ hero, heroes, matchups }) => {
  const { heroId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (heroId) {
      dispatch(loadHeroMatchups([heroId]));
    }
  }, [dispatch, heroId]);

  const disadvantageTitle = useResponsive({ short: 0, long: 1280 });

  if (!hero) {
    return <span>Loading...</span>;
  }

  const tableData = Object.keys(matchups || {}).map((enemyId) => ({
    key: enemyId,
    ...heroes[enemyId],
    ...matchups[enemyId],
  }));

  const tableColumns: ColumnsType<typeof tableData[0] | object> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Hero',
      render: (name: string, hero) => (
        <div style={{ whiteSpace: 'nowrap' }}>
          <HeroMatchupAvatar
            src={(hero as typeof tableData[0]).imageUrl}
            alt=""
          />
          {name}
        </div>
      ),
      align: 'left',
    },
    {
      key: 'disadvantage',
      dataIndex: 'disadvantage',
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
      render: (disadvantage: number) => `${disadvantage.toFixed(2)}%`,
    },
    {
      key: 'matchesPlayed',
      dataIndex: 'matchesPlayed',
      title: 'Matches Played',
      align: 'right',
      render: (matchesPlayed: number) => matchesPlayed.toLocaleString(),
    },
    {
      key: 'winRate',
      dataIndex: 'winRate',
      title: `${hero.name} Win Rate`,
      align: 'right',
      render: (winRate: number) => `${winRate.toFixed(2)}%`,
    },
  ];

  return (
    <div>
      <HeroHeading>
        <HeroAvatar name={hero.name} imageUrl={hero.imageUrl}></HeroAvatar>
        <HeroTitle>
          <HeroName>{hero.name}</HeroName>
          <div>
            {hero.attackType} - {hero.roles.join(', ')}
          </div>
        </HeroTitle>
      </HeroHeading>
      <br />
      {matchups && Object.keys(matchups).length > 0 && (
        <div>
          <h2>Matchups</h2>
          <StyledTable
            dataSource={tableData}
            pagination={false}
            columns={tableColumns}
          ></StyledTable>
        </div>
      )}
      <DotabuffLink
        target="_blank"
        href={`https://dotabuff.com/heroes/${hero.id}`}
      >
        <img
          alt="Dotabuff logo"
          src="https://miro.medium.com/max/332/1*L7bUVdusS37qo_Gr2qEbKw.png"
        />
      </DotabuffLink>
    </div>
  );
};

export default connector(HeroPage);
