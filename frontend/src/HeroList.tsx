import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

interface Hero {
  id: number;
  localized_name: string;
  img: string;
  icon: FunctionStringCallback;
}

export default function HeroList() {
  const [heroes, setHeroes] = useState([] as Hero[]);

  useEffect(() => {
    Axios.get<Hero[]>('https://api.opendota.com/api/constants/heroes').then((resp) => {
      setHeroes(Object.values(resp.data).sort((hero1, hero2) => (hero1.localized_name < hero2.localized_name) ? -1 : 1))
    }).catch((error) => {
      console.log('error', error);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {heroes.map(hero =>
          <Link
            to={`/heroes/${hero.id}`}
            key={hero.id}
          >
            <img alt={hero.localized_name} src={'https://api.opendota.com' + hero.img}></img>
            {hero.id} {hero.localized_name}
          </Link>)}
      </header>
    </div>
  );
}