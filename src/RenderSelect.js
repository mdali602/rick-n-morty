import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    color: 'red',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const RenderSelect = (props) => {
  const classes = useStyles();
  const {
    name,
    onChange,
    label,
    options,
    optionId,
    optionValue,
    optionLabel,
  } = props;

  return (
    <div>
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          // eslint-disable-next-line react/jsx-props-no-spreading
          name={name}
          onChange={onChange}
          labelId={label}
          id={`${label}-select`}
          // value={age}
          // onChange={() => {})}
        >
          {options.map((option) => {
            if (typeof option === 'object') {
              return (
                <MenuItem
                  key={option[optionId]}
                  value={option[optionValue]}
                >
                  {option[optionLabel]}
                </MenuItem>
              );
            }
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

RenderSelect.propTypes = {
  name: PropTypes.shape({}).isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf().isRequired,
  onChange: PropTypes.func,
  optionId: PropTypes.string,
  optionValue: PropTypes.string,
  optionLabel: PropTypes.string,
};

RenderSelect.defaultProps = {
  onChange: () => {},
  optionId: '',
  optionValue: '',
  optionLabel: '',
};

export default RenderSelect;
