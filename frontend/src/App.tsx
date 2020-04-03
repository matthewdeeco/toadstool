import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface Hero {
  id: number;
  localized_name: string;
}

class App extends React.Component<{}, {heroes: Hero[]}> {

  componentWillMount() {
    fetch('https://api.opendota.com/api/heroes').then((val) => {
      val.json().then((heroes) => {
        console.log(heroes);
        this.setState({
          heroes,
        });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state?.heroes.map(hero => <p key={hero.id}>{hero.localized_name}</p>)}
        </header>
      </div>
    );
  }
}

export default App;
