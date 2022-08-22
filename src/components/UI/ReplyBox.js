import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import classes from './ReplyBox.module.css';
import img from '../../asset/oasis.jpeg';
import useHttp from '../../Hook/useHttp';
import { authActions } from '../../store/auth';
import LoadingSpinner from './LoadingSpinner';

const ReplyBox = () => {
  const [enteredInput, setEnteredInput] = useState('');
  const [replyList, setReplyList] = useState({});
  const [update, setUpdate] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const nick = useSelector(state => state.auth.enteredNick);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();

  // useHttp
  const { isLoading, error, sendRequest } = useHttp();
  const {
    isLoading: fetchLoading,
    error: fetchError,
    sendRequest: fetchReply,
  } = useHttp();

  // FireBase
  const url = `https://gamesearch-3e27f-default-rtdb.firebaseio.com/reply/${params.gameId}.json`;

  // useHttp Config
  const requestConfig = {
    url,
    method: 'POST',
    body: { reply: enteredInput, nick, time: new Date().toLocaleString() },
    headers: {
      'Content-type': 'application/json',
    },
  };

  const fetchReplyConfig = useMemo(() => {
    return { url };
  }, [url]);

  // 닉네임, 댓글리스트 불러오기
  useEffect(() => {
    dispatch(authActions.enteredNick());
    fetchReply(fetchReplyConfig, fetchReplyData);
  }, [update, fetchReply, fetchReplyConfig, dispatch]);

  const fetchReplyData = useCallback(reply => {
    let dataBox = [];
    for (let key in reply) {
      let nick = reply[key].nick;
      let replyData = reply[key].reply;
      let time = reply[key].time;
      dataBox.push({ nick, replyData, key, time });
    }
    setReplyList(dataBox.reverse());
  }, []);

  // 댓글 입력값 받아오기
  const inputChangeHandler = e => {
    setEnteredInput(e.target.value);
  };

  // 로그인 한경우에 댓글 post
  const postReplyHandler = () => {
    if (isLoggedIn) {
      setUpdate(true);
      setTimeout(() => {
        setUpdate(false);
      }, 300);
      sendRequest(requestConfig);
      setEnteredInput('');
    } else if (!isLoggedIn) {
      navigate('/login');
    }
  };

  const navigateToLoginHandler = () => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  };

  // 댓글리스트
  const replyData =
    replyList && replyList.length
      ? replyList.map(r => (
          <li key={r.key}>
            <div className={classes.metaBox}>
              <img src={img} alt="" />
              <p className={classes.nick}>{r.nick}</p>
            </div>
            <div className={classes.textBox}>
              <p>{r.replyData}</p>
            </div>
            <p className={classes.date}>{r.time}</p>
          </li>
        ))
      : '';
  // 이하 컴포넌트 ////////////////////
  let content;

  if (fetchLoading) {
    content = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (fetchError) {
    content = <div className="centered error">Request Failed</div>;
  }

  if (!fetchLoading && !fetchError) {
    content = replyData;
  }

  return (
    <section className={classes.section}>
      <h2>Reviews</h2>
      <div className={classes.reply}>
        <img src={img} alt="" />
        <textarea
          className={classes.text}
          name="reply"
          id=""
          cols="30"
          rows="5"
          maxLength="500"
          placeholder={
            isLoggedIn
              ? '500 characters limit'
              : 'Login First (Click Here for Login)'
          }
          onChange={inputChangeHandler}
          onClick={navigateToLoginHandler}
          value={enteredInput}
        ></textarea>
        <button onClick={postReplyHandler}>Submit</button>
      </div>
      <ul className={classes.replyList}>{content}</ul>
    </section>
  );
};

export default ReplyBox;
