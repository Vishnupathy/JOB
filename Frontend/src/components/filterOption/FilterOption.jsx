import React from 'react';
import classes from './FilterOption.module.css';

const FilterOption = ({ value, onClick }) => {
  return (
    <div className={classes.FilterOption}>
      <p>{value}</p>
      <span onClick={onClick}>X</span>
    </div>
  );
};

export default FilterOption;
