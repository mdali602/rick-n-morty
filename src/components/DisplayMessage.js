import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: 715,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    fontWeight: 500,
    color: '#fff',
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
}));

const DisplayMessage = ({ message }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>{message}</div>
    </div>
  );
};

DisplayMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default DisplayMessage;
