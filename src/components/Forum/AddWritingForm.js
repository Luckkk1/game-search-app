import useHttp from '../../Hook/useHttp';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './AddWritingForm.module.css';

const AddWritingForm = () => {
  const { isLoading, error, success, sendRequest } = useHttp();
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredText, setEnteredText] = useState('');
  const [formCheck, setFormCheck] = useState(true);
  const navigate = useNavigate();

  const date = new Date();
  const krTime = date.getTime();
  const krDate = new Intl.DateTimeFormat('kr').format(date);

  const requestConfig = {
    url: `https://gamesearch-3e27f-default-rtdb.firebaseio.com/write.json`,
    method: 'POST',
    body: {
      title: enteredTitle,
      text: enteredText,
      date: krDate,
      time: krTime,
      nick: localStorage.getItem('nick'),
      key: localStorage.getItem('key'),
    },
    headers: {
      'Content-type': 'application/json',
    },
  };

  const writeSubmitHandler = e => {
    e.preventDefault();
    if (enteredText.length > 10 && enteredTitle.length > 3) {
      sendRequest(requestConfig);
      setFormCheck(true);
    } else {
      setFormCheck(false);
    }
  };

  useEffect(() => {
    if (!error && success && formCheck) {
      navigate('/forum?page=1');
    }
  }, [error, success, navigate, formCheck]);

  const titleChangeHandler = e => {
    setEnteredTitle(e.target.value);
  };

  const textChangeHandler = e => {
    setEnteredText(e.target.value);
  };

  return (
    <form onSubmit={writeSubmitHandler} className={classes.writeForm}>
      <div className={classes.inputControl}>
        <div className={classes.inputHeader}>
          <p>Title</p>
          <p>At least 3 character</p>
        </div>
        <input type="text" name="title" onChange={titleChangeHandler} />
      </div>
      <div className={classes.inputControl}>
        <div className={classes.inputHeader}>
          <p>Text</p>
          <p>At least 10 characters</p>
        </div>
        <textarea
          name="content"
          cols="30"
          rows="10"
          onChange={textChangeHandler}
        ></textarea>
        {error ||
          (!formCheck && (
            <p className={classes.errorMsg}>
              Please submit it according to the format
            </p>
          ))}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddWritingForm;
