/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
// import { colors } from '../utils/constants';
import { endPoint, colors } from '../utils/constants';
import withFetching from './withFetching';
import FilterBar from './FilterBar';
import DisplayMessage from './DisplayMessage';
import CardItem from './CardItem';
// import CardItem from './CardItem';
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

function App({ isLoading, data, fetchData, sortData }) {
  const classes = useStyles();

  const getCharacters = (queryParams) => {
    fetchData(queryParams);
  };

  const sortCharacters = (isAsc) => sortData(isAsc);

  return (
    <div className={classes.root}>
      {/* <p>Success</p> */}
      <FilterBar
        getCharacters={getCharacters}
        sortCharacters={sortCharacters}
      />
      {isLoading && <DisplayMessage message="Loading..." />}
      {!isLoading && data && data.error && (
        <DisplayMessage
          message={data.error || 'No records to display'}
        />
      )}
      <div className={classes.flexContainer}>
        {data &&
          data.results &&
          data.results.map((character) => (
            <CardItem key={character.id} character={character} />
          ))}
      </div>
    </div>
  );
}

/* App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(),
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.any(),
};

App.defaultProps = {
  data: [],
  error: null,
}; */
export default withFetching(endPoint.character)(App);
