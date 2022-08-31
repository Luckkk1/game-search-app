import classes from './RatingStar.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RatingStar = props => {
  const ratingScore = `${props.score * 2}%`;

  return (
    <div className={classes.rating}>
      <div className={classes.ratingUpper} style={{ width: ratingScore }}>
        <span>
          <FontAwesomeIcon icon={faStar} />
        </span>
        <span>
          <FontAwesomeIcon icon={faStar} />
        </span>
        <span>
          <FontAwesomeIcon icon={faStar} />
        </span>
        <span>
          <FontAwesomeIcon icon={faStar} />
        </span>
        <span>
          <FontAwesomeIcon icon={faStar} />
        </span>
      </div>
      <div className={classes.ratingLower}>
        <span>
          <FontAwesomeIcon icon={faStar} />
        </span>
        <span>
          <FontAwesomeIcon icon={faStar} />
        </span>
        <span>
          <FontAwesomeIcon icon={faStar} />
        </span>
        <span>
          <FontAwesomeIcon icon={faStar} />
        </span>
        <span>
          <FontAwesomeIcon icon={faStar} />
        </span>
      </div>
      <p className={classes.score}>{props.score}</p>
    </div>
  );
};

export default RatingStar;
