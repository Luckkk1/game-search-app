import classes from './ForumHeader.module.css';

const ForumHeader = () => {
  return (
    <div className={classes.forumHeader}>
      <p className={classes.textNum}>No.</p>
      <p className={classes.title}>Title</p>
      <p className={classes.nick}>Name</p>
      <p className={classes.date}>Date</p>
    </div>
  );
};

export default ForumHeader;
