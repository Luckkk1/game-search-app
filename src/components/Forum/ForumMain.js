import WritingList from './WritingList';
import { Link } from 'react-router-dom';
import useHttp from '../../Hook/useHttp';
import { forumSliceActions } from '../../store/forum';
import { useDispatch } from 'react-redux';

import classes from './ForumMain.module.css';
import { useEffect } from 'react';

const ForumMain = () => {
  const { sendRequest: getWritesLength } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    getWritesLength(
      {
        url: 'https://gamesearch-3e27f-default-rtdb.firebaseio.com/write.json',
      },
      getLength
    );
  }, []);

  const getLength = w => {
    let count = 0;
    for (let key in w) count++;
    dispatch(forumSliceActions.getWritesLength(count));
  };
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
