import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from 'typesafe-actions';

import HeroAvatar from '../components/HeroAvatar';
import { Hero } from '../models/hero';

type Item = unknown;

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

const HeroPage = ({ hero }: { hero?: Hero }) => {
  const { heroId } = useParams();
  const [, setItems] = useState([] as Item[]);

  useEffect(() => {
    Axios.get<Item[]>(
      `https://api.opendota.com/api/heroes/${heroId}/itemPopularity`,
    ).then((resp) => {
      setItems(resp.data);
    });
  }, [heroId]);

  if (!hero) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <div>
        <HeroAvatar name={hero.localized_name} url={hero.img}></HeroAvatar>
        <HeroTitle>
          <HeroName>{hero.localized_name}</HeroName>
          <div>{hero.roles.join(', ')}</div>
        </HeroTitle>
      </div>
      <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(hero)}</div>
    </div>
  );
};

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps<{ heroId: string }>,
) => {
  const heroId = Number(ownProps?.match.params.heroId);
  return {
    hero: state.heroes.find((hero) => hero.id === heroId),
  };
};

export default connect(mapStateToProps)(HeroPage);
