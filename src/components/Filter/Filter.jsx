import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateFilter } from 'store/contactsSlice';
import { getFilter } from 'store/selectors';

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const onFilterChange = e => {
    dispatch(updateFilter(e.target.value));
  }
  return (<div className={styles['filterWrapper']}>
    <input
      className={styles['filterInput']}
      type="text"
      placeholder="Пошук контактів"
      value={filter}
      onChange={onFilterChange}
    />
  </div>
)};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
