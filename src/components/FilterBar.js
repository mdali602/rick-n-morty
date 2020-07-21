// import debounce from 'lodash/debounce';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControlLabel, Switch } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import RenderSelect from './RenderSelect';
import { colors } from '../utils/constants';
import { dropDownFilters } from '../utils/factory';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: colors.secondary,
    padding: '20px 0',
    justifyContent: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    // color: fade(theme.palette.common.black, 0.15),
    color: 'rgba(0,0,0,0.87)',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    // pointerEvents: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 4,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  proot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 468,
    height: 60,
    margin: '0 10px',
  },
  droot: {
    padding: '2px 4px',
    margin: '0 10px',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    // width: 200,
    // padding: '0 10px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    width: 2,
    margin: 4,
  },
  resetBtn: {
    backgroundColor: colors.primary,
    color: colors.white,
    padding: '20px',
  },
}));

function FilterBar({ getCharacters, sortCharacters }) {
  const classes = useStyles();
  const [ASC, setASC] = useState(true);
  const [name, setName] = useState('');
  const [queryParams, setQueryParams] = useState({});

  const handleSearch = () => {
    setQueryParams((prevParams) => {
      const nextParams = {
        ...prevParams,
        name,
      };
      getCharacters(nextParams);
      return nextParams;
    });
  };

  const clearSearch = () => {
    setName('');
    setQueryParams((prevParams) => {
      const nextParams = {
        ...prevParams,
        name: '',
      };
      getCharacters(nextParams);
      return nextParams;
    });
  };

  const resetFilter = () => {
    setName('');
    setASC(true);
    setQueryParams({});
    getCharacters();
  };

  const handleTextFieldKeyDown = (event) => {
    event.persist();
    switch (event.key) {
      case 'Enter':
        handleSearch();
        return;
      case 'Escape':
        clearSearch();
        return;
      default:
        console.log('handleTextFieldKeyDown -> default');
    }
  };

  const handleChange = (event) => {
    setQueryParams((prevParams) => {
      const nextParams = {
        ...prevParams,
        [event.target.name]: event.target.value,
      };
      getCharacters(nextParams);
      return nextParams;
    });
  };

  const toggleSort = () => {
    setASC((prev) => !prev);
    sortCharacters(ASC);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <div style={{ padding: '10px 0' }}>
            <Paper component="div" className={classes.proot}>
              <InputBase
                className={classes.input}
                placeholder="Search By Name..."
                inputProps={{ 'aria-label': 'search' }}
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleTextFieldKeyDown}
              />
              {name && (
                <IconButton
                  type="button"
                  name="name"
                  className={classes.iconButton}
                  aria-label="clear"
                  onClick={clearSearch}
                >
                  <ClearRoundedIcon />
                </IconButton>
              )}

              <Divider
                className={classes.divider}
                orientation="vertical"
              />
              <IconButton
                type="button"
                name="name"
                className={classes.iconButton}
                aria-label="search"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
          <div style={{ display: 'flex', padding: '10px 0' }}>
            {dropDownFilters.map((dropDown) => (
              <Paper
                key={dropDown.name}
                component="div"
                className={classes.droot}
                // style={{ margin: '20px' }}
              >
                <RenderSelect
                  name={dropDown.name}
                  label={dropDown.label}
                  value={queryParams[dropDown.name]}
                  onChange={handleChange}
                  options={dropDown.options}
                  optionId={dropDown.optionId}
                  optionLabel={dropDown.optionLabel}
                  optionValue={dropDown.optionValue}
                />
              </Paper>
            ))}
          </div>
          <div>
            <FormControlLabel
              control={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Switch
                  checked={ASC}
                  onChange={toggleSort}
                  color={colors.primary}
                />
              }
              label={ASC ? 'Ascending' : 'Descending'}
            />

            <Button
              type="button"
              variant="contained"
              className={classes.resetBtn}
              onClick={resetFilter}
            >
              Reset Filter
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

FilterBar.propTypes = {
  getCharacters: PropTypes.func.isRequired,
  sortCharacters: PropTypes.func.isRequired,
};

export default FilterBar;
