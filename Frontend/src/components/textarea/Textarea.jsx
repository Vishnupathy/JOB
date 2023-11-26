import React from 'react';
import classes from './Textarea.module.css';

const Input = ({ type, value, onChange, placeholder }) => {
  return (
    <div>
      <textarea
        className={classes.Textarea}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
