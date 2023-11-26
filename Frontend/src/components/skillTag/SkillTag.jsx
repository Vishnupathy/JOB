import React from 'react';
import classes from './SkillTag.module.css';
const SkillTag = ({ title }) => {
  return (
    <div>
      <p className={classes.Tag}>{title}</p>
    </div>
  );
};

export default SkillTag;
