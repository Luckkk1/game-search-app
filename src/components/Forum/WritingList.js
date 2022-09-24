import { Fragment, useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../../Hook/useHttp';
import { useLocation, Link } from 'react-router-dom';
import { forumSliceActions } from '../../store/forum';
import { useDispatch } from 'react-redux';

import ForumHeader from './ForumHeader';
import Writing from './Writing';
import classes from './WritingList.module.css';

const WritingList = () => {
  const { isLoading, error, success, sendRequest: getWritingData } = useHttp();
  const [writes, setWrites] = useState([]);

  const location = useLocation();
  const writesLength = useSelector(state => state.forum.writesLength);

  const QueryParams = new URLSearchParams(location.search);
  const pageNum = QueryParams.get('page');

  const fetchWrites = useCallback(write => {
    let temp = [];
    for (let i = 0; i < writesLength / 14; i++) {
      temp.push([]);
    }

    let count = 0;
    let page = 0;

    write = Object.entries(write)
      .sort(([, a], [, b]) => b.textNum - a.textNum)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    for (let key in write) {
      let date = write[key].date;
      let time = write[key].time;
      let text = write[key].text;
      let title = write[key].title;
      let nick = write[key].nick;
      let id = write[key].id;
      let userId = key;
      let textId = write[key].textNum;

      if (!temp[page]) temp[page] = [];

      temp[page].push({ date, text, title, nick, id, userId, textId });
      count++;
      if (count === 14) {
        page++;
        count = 0;
      }
    }

    setWrites(temp);
  });

  useEffect(() => {
    getWritingData(
      {
        url: 'https://gamesearch-3e27f-default-rtdb.firebaseio.com/write.json',
      },
      fetchWrites
    );
  }, [getWritingData]);

  const content =
    writes.length > 0
      ? writes[pageNum - 1].map(e => {
          return <Writing data={e} key={e.textId} />;
        })
      : '';

  let searchPageContent;

  const boldNum = n => {
    return +pageNum === +n ? <b style={{ color: 'white' }}>{n}</b> : n;
  };

  const setLink = n => {
    return `/forum?page=${n}`;
  };

  if (+pageNum === 1) {
    searchPageContent = (
      <Fragment>
        <Link to={setLink(1)}>&lt;</Link>
        {boldNum(+pageNum)}
        <Link to={setLink(2)}>&gt;</Link>
      </Fragment>
    );
  } else {
    searchPageContent = (
      <Fragment>
        <Link to={setLink(+pageNum - 1)}>&lt;</Link>
        {boldNum(+pageNum)}
        <Link
          to={
            writesLength > pageNum * 14
              ? setLink(+pageNum + 1)
              : setLink(pageNum)
          }
        >
          &gt;
        </Link>
      </Fragment>
    );
  }

  return (
    <div className={classes.writingList}>
      <ForumHeader />
      {content}
      <div className={classes.pageControl}>
        {+pageNum === Math.ceil(writesLength / 14) && <p>Last Page</p>}
        {searchPageContent}
      </div>
    </div>
  );
};

export default WritingList;
