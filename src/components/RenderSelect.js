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
    label,
    value,
    onChange,
    options,
    optionId,
    optionValue,
    optionLabel,
  } = props;

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          name={name}
          value={value}
          onChange={onChange}
          labelId={label}
          id={`${label}-select`}
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
  value: PropTypes.string,
  options: PropTypes.arrayOf().isRequired,
  onChange: PropTypes.func,
  optionId: PropTypes.string,
  optionValue: PropTypes.string,
  optionLabel: PropTypes.string,
};

RenderSelect.defaultProps = {
  value: '',
  onChange: () => {},
  optionId: '',
  optionValue: '',
  optionLabel: '',
};

export default RenderSelect;
