import debounce from 'lodash/debounce';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import RenderSelect from './RenderSelect';
import { genders, species } from './constants';
// import SearchContext from './SearchContext';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
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
  /* sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }, */
  formControl: {
    margin: theme.spacing(1),
    color: 'red',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function PrimarySearchAppBar({ getCharacters }) {
  const classes = useStyles();
  // const { getCharacters } = useContext(SearchContext);
  // eslint-disable-next-line no-unused-vars
  const [queryParams, setQueryParams] = useState({});
  const handleSearch = (event) => {
    setQueryParams((prevParams) => {
      const nextParams = {
        ...prevParams,
        [event.target.name]: event.target.value,
      };
      getCharacters(nextParams);
      return nextParams;
    });
  };

  const handleDebounceSearch = (event) => {
    /* signal to React not to nullify the event object */
    event.persist();
    if (!window.debouncedFn) {
      window.debouncedFn = debounce(() => {
        setQueryParams((prevParams) => {
          const nextParams = {
            ...prevParams,
            [event.target.name]: event.target.value,
          };
          getCharacters(nextParams);
          return nextParams;
        });
      }, 500);
    }
    window.debouncedFn();
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name="name"
              onChange={handleDebounceSearch}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <RenderSelect
            name="gender"
            label="Gender"
            options={genders}
            optionId="id"
            optionLabel="label"
            optionValue="value"
            onChange={handleSearch}
          />
          <RenderSelect
            name="species"
            label="Species"
            options={species}
            onChange={handleSearch}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

PrimarySearchAppBar.propTypes = {
  getCharacters: PropTypes.func.isRequired,
};

export default PrimarySearchAppBar;
