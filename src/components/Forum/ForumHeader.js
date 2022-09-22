import classes from './ForumHeader.module.css';

const ForumHeader = () => {
  return (
    <div className={classes.forumHeader}>
      <p className={classes.textNum}>글번호</p>
      <p className={classes.title}>제목</p>
      <p className={classes.nick}>닉네임</p>
      <p className={classes.date}>일시</p>
    </div>
  );
};

export default ForumHeader;
