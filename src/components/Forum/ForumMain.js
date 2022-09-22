import WritingList from './WritingList';
import classes from './ForumMain.module.css';
const ForumMain = () => {
  return (
    <section className={classes.forumMain}>
      <h2>Forum</h2>
      <WritingList />
    </section>
  );
};

export default ForumMain;
