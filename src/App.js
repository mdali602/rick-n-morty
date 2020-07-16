import debounce from 'lodash/debounce';
import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { endPoint } from './constants';
import fetch from './fetch';
import PrimarySearchAppBar from './PrimarySearchAppBar';

function App() {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async (queryParams = {}) => {
    try {
      const data = await fetch(endPoint.character, { queryParams });
      const { results = [] } = await data.json();
      console.log('TCL: getCharacters -> results', results);
      setCharacters(results);
    } catch (err) {
      console.log('ERROR: getCharacters -> err', err);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const handleSearch = (event) => {
    /* signal to React not to nullify the event object */
    event.persist();

    if (!window.debouncedFn) {
      window.debouncedFn = debounce(() => {
        // let searchString = event.target.value;
        // fetchSearchData(searchString);
        console.log('###########', event.target.value);
        getCharacters({ name: event.target.value });
      }, 500);
    }
    window.debouncedFn();
  };
  return (
    <div className="App">
      <PrimarySearchAppBar handleSearch={handleSearch} />
      {characters.map((character) => (
        <p key={character.id}>{character.name}</p>
      ))}
    </div>
  );
}

export default App;
