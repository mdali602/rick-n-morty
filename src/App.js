// import debounce from 'lodash/debounce';
import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { endPoint } from './constants';
import fetch from './fetch';
import PrimarySearchAppBar from './PrimarySearchAppBar';
// import SearchContext from './SearchContext';

function App() {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async (queryParams = {}) => {
    try {
      const data = await fetch(endPoint.character, { queryParams });
      const { results = [] } = await data.json();
      setCharacters(results);
    } catch (err) {
      console.log('getCharacters -> err', err);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    // <SearchContext.Provider value={{ getCharacters }}>
    <div className="App">
      <PrimarySearchAppBar getCharacters={getCharacters} />
      {characters.map((character) => (
        <p key={character.id}>{character.name}</p>
      ))}
    </div>
    // </SearchContext.Provider>
  );
}

export default App;
