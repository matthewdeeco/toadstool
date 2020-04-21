import React, { useEffect } from 'react';
import { connect, useDispatch, ConnectedProps } from 'react-redux';
import { useParams, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from 'typesafe-actions';

import { loadHeroMatchups } from '../actions';
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
type PropsFromRedux = ConnectedProps<typeof connector>
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
  margin-bottom: 4px;
`;

const DotabuffLink = styled.a`
  margin: 1rem 0;
  display: inline-block;
  img {
    width: 128px;
  }
`;

const HeroPage: React.FC<HeroPageProps> = ({
  hero,
  heroes,
  matchups,
}) => {
  const { heroId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (heroId) {
      dispatch(loadHeroMatchups(heroId));
    }
  }, [dispatch, heroId]);

  if (!hero) {
    return <span>Loading...</span>;
  }

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
      {matchups && matchups.length > 0 && (
        <div>
          <h2>Matchups</h2>
          <table>
            <thead>
              <tr>
                <th colSpan={2} align="left">Hero</th>
                <th>Disadvantage</th>
                <th>Matches Played</th>
                <th>Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {matchups.map(heroMatchup => (
                <tr key={heroMatchup.heroId}>
                  <td>
                    <HeroMatchupAvatar alt="" src={heroes[heroMatchup.heroId].imageUrl} />
                  </td>
                  <td>
                    {heroes[heroMatchup.heroId].name}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {heroMatchup.disadvantage.toFixed(2)}%
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {heroMatchup.matchesPlayed.toLocaleString()}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {heroMatchup.winRate.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(hero)}</div>
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
