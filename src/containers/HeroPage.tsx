
import Column from 'antd/lib/table/Column';
import React, { useEffect } from 'react';
import { connect, useDispatch, ConnectedProps } from 'react-redux';
import { useParams, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from 'typesafe-actions';

import { loadHeroMatchups } from '../actions';
import AppTable from '../components/AppTable';
import HeroAvatar from '../components/HeroAvatar';
import { Hero } from '../models/hero';

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

  if (!hero) {
    return <span>Loading...</span>;
  }

  const tableData = Object.keys(matchups || {}).map((enemyId) => ({
    key: enemyId,
    ...heroes[enemyId],
    ...matchups[enemyId],
  }));

  return (
    <div>
      <div>
        <HeroAvatar name={hero.name} imageUrl={hero.imageUrl}></HeroAvatar>
        <HeroTitle>
          <HeroName>{hero.name}</HeroName>
          <div>
            {hero.attackType} - {hero.roles.join(', ')}
          </div>
        </HeroTitle>
      </div>
      <br />
      {matchups && Object.keys(matchups).length > 0 && (
        <div>
          <h2>Matchups</h2>
          <StyledTable dataSource={tableData} pagination={false}>
            <Column
              title="Hero"
              align="left"
              dataIndex="name"
              key="name"
              render={(name: string, hero: Hero) => (
                <div style={{ whiteSpace: 'nowrap' }}>
                  <HeroMatchupAvatar src={hero.imageUrl} alt="" />
                  {name}
                </div>
              )}
            ></Column>

            <Column
              title="Dis."
              align="right"
              dataIndex="disadvantage"
              key="disadvantage"
              render={(disadvantage: number) => `${disadvantage.toFixed(2)}%`}
            ></Column>

            <Column
              title="Matches Played"
              align="right"
              dataIndex="matchesPlayed"
              key="matchesPlayed"
              render={(matchesPlayed: number) => matchesPlayed.toLocaleString()}
            ></Column>

            <Column
              title={`${hero.name} Win Rate`}
              align="right"
              dataIndex="winRate"
              key="winRate"
              render={(winRate: number) => `${winRate.toFixed(2)}%`}
            ></Column>
          </StyledTable>
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
