import moment from 'moment';
import { genders, species, statuses } from './constants';

export const isExist = (value) => {
  return !(value === undefined || value === null || value === '');
};

export const deepFind = (obj, path) => {
  const paths = (path || '').split('.');
  let current = obj;

  for (let i = 0; i < paths.length; i += 1) {
    if (isExist(current[paths[i]])) {
      current = current[paths[i]];
    } else {
      return '';
    }
  }
  return current;
};

export const timeStamp = (dateTime) => moment(dateTime).fromNow();

// import SearchContext from './SearchContext';
const createDropdownFilterData = (
  name,
  label,
  options,
  optionId,
  optionLabel,
  optionValue,
) => ({
  name,
  label,
  options,
  optionId,
  optionLabel,
  optionValue,
});

export const dropDownFilters = [
  createDropdownFilterData(
    'species',
    'Species',
    species,
    'label',
    'label',
    'value',
  ),
  createDropdownFilterData(
    'gender',
    'Gender',
    genders,
    'id',
    'label',
    'value',
  ),
  createDropdownFilterData(
    'status',
    'Status',
    statuses,
    'label',
    'label',
    'value',
  ),
];
