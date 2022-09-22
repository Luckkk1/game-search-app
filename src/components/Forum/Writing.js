import classes from './Writing.module.css';

const Writing = () => {
  return (
    <div className={classes.writing}>
      <p className={classes.textNum}>000001</p>
      <p className={classes.title}>첫 게시물</p>
      <p className={classes.nick}>프론트엔드 개발자</p>
      <p className={classes.date}>2022/10/12</p>
    </div>
  );
};

export default Writing;
