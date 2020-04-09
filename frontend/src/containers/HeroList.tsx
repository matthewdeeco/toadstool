import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { loadHeroes } from '../actions';
import { RootState } from 'typesafe-actions';
import { Hero } from '../models/hero';

const HeroList = ({ heroes }: { heroes: Hero[]}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHeroes());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        {heroes?.map(hero =>
          <Link
            to={`/heroes/${hero.id}`}
            key={hero.id}
            style={{position: 'relative', flex: '0 1 auto', display: 'inline-flex'}}
          >
            <img alt={hero.localized_name} src={'https://api.opendota.com' + hero.img} style={{width: '128px', height: '72px'}}></img>
            <span style={{
              position: 'absolute',
              left: '0.25rem',
              bottom: '0.25rem',
              color: 'white',
              textShadow: '0px 0px 4px #0a0a0a',
              fontSize: '13px',
            }}>{hero.localized_name}</span>
          </Link>)}
      </header>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    heroes: state.heroes
  }
}

export default connect(mapStateToProps)(HeroList);
