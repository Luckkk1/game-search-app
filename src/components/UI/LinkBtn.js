import { Link } from 'react-router-dom';
import classes from './LinkBtn.module.css';

const LinkBtn = props => {
  const style = `${classes.link} ${props.className}`;
  return (
    <Link to={props.to} className={style}>
      {props.children}
    </Link>
  );
};

export default LinkBtn;
