import classes from './RatingStar.module.css';

const RatingStar = props => {
  return (
    <div className={classes.rating}>
      <div className={classes.ratingUpper} style={{ width: props.score }}>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
      <div className={classes.ratingLower}>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
    </div>
  );
};

export default RatingStar;
