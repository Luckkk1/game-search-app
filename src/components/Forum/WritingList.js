import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useHttp from '../../Hook/useHttp';
import { forumSliceActions } from '../../store/forum';

import ForumHeader from './ForumHeader';
import Writing from './Writing';
import classes from './WritingList.module.css';

const WritingList = () => {
  const { isLoading, error, success, sendRequest: getWritingData } = useHttp();
  const [writes, setWrites] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getWritingData(
      {
        url: 'https://gamesearch-3e27f-default-rtdb.firebaseio.com/write.json',
      },
      fetchWrites
    );
  }, [getWritingData]);

  const fetchWrites = write => {
    const temp = [];
    let count = 0;

    for (let key in write) {
      let date = write[key].date;
      let time = write[key].time;
      let text = write[key].text;
      let title = write[key].title;
      let nick = write[key].nick;
      let id = write[key].id;
      let userId = key;
      let textId = write[key].textNum;
      temp.push({ date, text, title, nick, id, userId, textId });
      count++;
    }
    setWrites(temp);
    dispatch(forumSliceActions.getWritesLength(count));
  };

  const content = writes.map(e => {
    return <Writing data={e} key={e.textId} />;
  });

  return (
    <div className={classes.writingList}>
      <ForumHeader />
      {content}
    </div>
  );
};

export default WritingList;
