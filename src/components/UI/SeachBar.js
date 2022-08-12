import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import classes from './SearchBar.module.css';

const SearchBar = props => {
  const style = `${classes.search} ${props.className}`;
  const navigate = useNavigate();
  const inputRef = useRef();

  const searchSubmitHandler = e => {
    e.preventDefault();
    const enteredSearch = inputRef.current.value;
    navigate(`/browse?q=${enteredSearch}`);
    inputRef.current.value = '';
  };

  return (
    <form onSubmit={searchSubmitHandler}>
      <input
        className={style}
        type="text"
        placeholder="Search"
        ref={inputRef}
      />
    </form>
  );
};

export default SearchBar;
