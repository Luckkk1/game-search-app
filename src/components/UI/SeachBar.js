import { useNavigate } from 'react-router-dom';
import classes from './SearchBar.module.css';

const SearchBar = props => {
  const style = `${classes.search} ${props.className}`;
  const navigate = useNavigate();
  const searchSubmitHandler = e => {
    e.preventDefault();
    navigate(`/${props.link}`);
  };

  return (
    <form onSubmit={searchSubmitHandler}>
      <input className={style} type="text" placeholder="Search" />
    </form>
  );
};

export default SearchBar;
