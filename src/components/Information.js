import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { colors } from '../utils/constants';
import { deepFind } from '../utils/factory';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: '10px 0',
    fontSize: '12px',
    alignItems: 'center',
    borderBottom: `1px solid ${colors.balck}`,
    justifyContent: 'space-between',
    '&:last-child': {
      borderBottom: '1px solid transparent',
    },
  },
  removeBorder: {
    borderBottom: '1px solid transparent',
  },
  leftAlign: {
    color: colors.white,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  rightAlign: {
    color: colors.secondary,
    textAlign: 'right',
  },
}));

const Information = ({ character, property }) => {
  const classes = useStyles();
  const info = (styles, value) => {
    return (
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        className={styles}
      >
        {value}
      </Typography>
    );
  };
  return (
    <Grid container xs={12} className={classes.root}>
      <Grid xs={6}>{info(classes.leftAlign, property.label)}</Grid>
      <Grid xs={6}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.rightAlign}
        >
          {info(
            classes.rightAlign,
            deepFind(character, property.access),
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

Information.propTypes = {
  character: PropTypes.objectOf().isRequired,
  property: PropTypes.objectOf().isRequired,
};

export default Information;
