import React from 'react';
import styles from './Filter.module.css';

const Filter = ({ filter, onFilterChange }) => (
  <div className={styles['filter-wrapper']}>
    <input
      className={styles['filter-input']}
      type="text"
      placeholder="Search contacts"
      value={filter}
      onChange={onFilterChange}
    />
  </div>
);

export default Filter;
