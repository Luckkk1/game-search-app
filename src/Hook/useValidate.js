import { useState } from 'react';

const useValidate = (validate, errMsg) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [inputError, setInputError] = useState(null);
  const [enteredInput, setEnteredInput] = useState('');

  const inputFocusHandler = () => {
    setInputFocus(true);
  };

  const inputBlurHandler = () => {
    if (!validate(enteredInput)) {
      setInputError(errMsg);
      if (enteredInput.trim() === '') {
        setInputError('필수 입력 사항입니다.');
        setInputFocus(false);
      }
    } else {
      setInputError(null);
    }
  };

  const inputChangeHandler = e => {
    setEnteredInput(e.target.value);
  };

  return {
    inputFocus,
    inputError,
    enteredInput,
    inputBlurHandler,
    inputFocusHandler,
    inputChangeHandler,
  };
};

export default useValidate;
