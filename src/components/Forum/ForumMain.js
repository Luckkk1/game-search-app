import WritingList from './WritingList';
import { Link } from 'react-router-dom';

import classes from './ForumMain.module.css';
const ForumMain = () => {
  return (
    <section className={classes.forumMain}>
      <div className={classes.header}>
        <h2>Forum</h2>
        <Link to={'/forum/add'}>Write</Link>
      </div>
      <WritingList />
    </section>
  );
};

export default ForumMain;
