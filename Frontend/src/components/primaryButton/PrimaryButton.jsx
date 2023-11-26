import React from 'react';
import classes from './PrimaryButton.module.css';
const PrimaryButton = ({ text, fontSize, style, onClick }) => {
  return (
    <button className={classes.PrimaryButton} style={style} onClick={onClick}>
      {text}
    </button>
  );
};

export default PrimaryButton;
