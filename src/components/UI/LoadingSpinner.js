import classes from './LoadingSpinner.module.css';

const LoadingSpinner = props => {
  let style = `${classes.spinner} ${props.className}`;
  return <div className={style}></div>;
};

export default LoadingSpinner;
