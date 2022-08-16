import useValidate from '../../../Hook/useValidate';

import classes from './NameInput.module.css';

const nameReg = /^[가-힝A-Za-z]{2,}$/;
const nameValidator = enteredVal => nameReg.test(enteredVal);

const NameInput = props => {
  const {
    inputFocus: nameFocus,
    inputError: nameError,
    enteredInput: enteredName,
    inputBlurHandler: nameBlurHandler,
    inputFocusHandler: nameFocusHandler,
    inputChangeHandler: nameChangeHandler,
  } = useValidate(nameValidator, '올바른 이름을 입력해주세요.');

  // 에러인 경우의 스타일클래스
  const errorStyle = error =>
    `${classes.formControl} ${error ? classes.errorBox : ''}`;

  // 포커스 상태의 스타일 클래스
  const focusStyle = focus => (focus ? classes.focus : '');

  return (
    <div className={errorStyle(nameError)}>
      <label htmlFor="name" className={focusStyle(nameFocus)}>
        성명<span className={classes.fill}>*</span>
      </label>
      <input
        type="text"
        id="name"
        value={enteredName}
        onFocus={nameFocusHandler}
        onBlur={nameBlurHandler}
        onChange={nameChangeHandler}
      />
      {nameError && <p className={classes.error}>{nameError}</p>}
    </div>
  );
};

export default NameInput;
