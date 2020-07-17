import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { endPoint, colors } from '../utils/constants';
import fetch from '../utils/fetch';
import FilterBar from './FilterBar';
import CardItem from './CardItem';
import DisplayMessage from './DisplayMessage';
// import {moduleName} from './constants'

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: colors.primary,
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}));

function App() {
  const classes = useStyles();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCharacters = async (queryParams = {}) => {
    try {
      setLoading(true);
      const data = await fetch(endPoint.character, { queryParams });
      const { results = [] } = await data.json();
      setCharacters(results);
      setLoading(false);
    } catch (err) {
      console.log('getCharacters -> err', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const sortCharacters = (isAsc) =>
    setCharacters((prevChars) => [
      ...prevChars.sort((a, b) =>
        !isAsc ? a.id - b.id : b.id - a.id,
      ),
    ]);

  return (
    <div className={classes.root}>
      <FilterBar
        getCharacters={getCharacters}
        sortCharacters={sortCharacters}
      />
      {loading && <DisplayMessage message="Loading..." />}
      {!loading && characters.length === 0 && (
        <DisplayMessage message="No records to display" />
      )}
      <div className={classes.flexContainer}>
        {characters.map((character) => (
          <CardItem key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}

export default App;
