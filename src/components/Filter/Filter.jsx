import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ filter, onFilterChange }) => (
  <div className={styles['filterWrapper']}>
    <input
      className={styles['filterInput']}
      type="text"
      placeholder="Пошук контактів"
      value={filter}
      onChange={onFilterChange}
    />
  </div>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
