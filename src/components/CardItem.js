import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import { Grid, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { red } from '@material-ui/core/colors';
import Information from './Information';
import { colors } from '../utils/constants';
import { timeStamp } from '../utils/factory';

const useStyles = makeStyles(() => ({
  root: {
    width: 345,
    margin: '10px',
    textAlign: 'center',
    backgroundColor: colors.grey,
  },
  media: {
    height: 100,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  header: {
    position: 'relative',
  },
  infoHeader: {
    position: 'absolute',
    width: 'inherit',
    bottom: '0',
    padding: '12px',
    background: 'rgba(0, 0, 0, 0.75)',
    color: colors.white,
  },
  mainInfo: {
    color: colors.white,
    fontSize: '22px',
    textAlign: 'left',
  },
  subInfo: {
    color: colors.white,
    fontSize: '16px',
    textAlign: 'left',
  },
}));

const properties = [
  { id: 'status', label: 'Status', access: 'status' },
  { id: 'species', label: 'Species', access: 'species' },
  { id: 'gender', label: 'Gender', access: 'gender' },
  { id: 'origin', label: 'Origin', access: 'origin.name' },
  { id: 'location', label: 'Last Location', access: 'location.name' },
];

function CardItem({ character }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Grid container xs={12} className={classes.header}>
        <Grid xs={12}>
          <CardMedia
            className={classes.media}
            image={character.image}
            title="Paella dish"
          />
        </Grid>
        <Grid xs={12} className={classes.infoHeader}>
          <Typography
            variant="body2"
            component="p"
            className={classes.mainInfo}
          >
            {character.name}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            className={classes.subInfo}
          >
            id: {character.id} - created{' '}
            {timeStamp(character.created)}
          </Typography>
        </Grid>
      </Grid>
      <CardContent>
        {properties.map((property) => (
          <Information
            key={property.id}
            character={character}
            property={property}
          />
        ))}
      </CardContent>
    </Card>
  );
}

CardItem.propTypes = {
  character: PropTypes.objectOf().isRequired,
};
export default CardItem;
