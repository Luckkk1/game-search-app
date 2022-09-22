import { Fragment } from 'react';

import ForumHeader from './ForumHeader';
import Writing from './Writing';
import classes from './WritingList.module.css';

const WritingList = () => {
  return (
    <div className={classes.writingList}>
      <ForumHeader />
      <Writing />
      <Writing />
      <Writing />
      <Writing />
      <Writing />
      <Writing />
      <Writing />
      <Writing />
      <Writing />
      <Writing />
      <Writing />
      <Writing />
      <Writing />
      <Writing />
      <Writing />
    </div>
  );
};

export default WritingList;
