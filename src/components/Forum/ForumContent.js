import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import classes from './ForumContent.module.css';
import useHttp from '../../Hook/useHttp';

const ForumContent = () => {
  const { isLoading, error, success, sendRequest } = useHttp();
  const [data, setData] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    sendRequest(
      {
        url: `https://gamesearch-3e27f-default-rtdb.firebaseio.com/write.json`,
      },
      getData
    );
  }, [params.contId, sendRequest]);

  const getData = write => {
    for (let key in write) {
      if (write[key].textNum === +params.contId) {
        setData({
          date: write[key].date,
          title: write[key].title,
          text: write[key].text,
          nick: write[key].nick,
        });
      }
    }
  };

  const goBackClickHandler = () => {
    navigate(-1);
  };

  return (
    <div className={classes.contentBox}>
      <div className={classes.bar}>
        <div className={classes.title}>{data.title}</div>
        <div className={classes.meta}>
          <p>{data.nick}</p>
          <p>{data.date}</p>
          <button onClick={goBackClickHandler}>Back</button>
        </div>
      </div>
      <div className={classes.content}>{data.text}</div>
    </div>
  );
};

export default ForumContent;
