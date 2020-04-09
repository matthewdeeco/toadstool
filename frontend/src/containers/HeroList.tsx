import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useDispatch, connect } from 'react-redux';
import { fetchHeroes } from '../actions';

interface Hero {
  id: number;
  localized_name: string;
  img: string;
  icon: FunctionStringCallback;
}

const HeroList = ({ heroes }: { heroes: Hero[]}) => {
  console.log('heroes', heroes);
  // const [heroes, setHeroes] = useState([] as Hero[]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroes());
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

const mapStateToProps = (state: any) => {
  return {
    heroes: state.heroes
  }
}


export default connect(mapStateToProps)(HeroList);
