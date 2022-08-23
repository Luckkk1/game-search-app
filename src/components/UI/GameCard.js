import { Link } from 'react-router-dom';

import classes from './GameCard.module.css';

const GameCard = props => {
  let meta = props.metacritic;
  let metaColor;
  // 메타스코어의 변화에 따른 숫자 색상의 변화
  if (meta >= 0 && meta < 40) metaColor = '#6c757d';
  if (meta >= 40 && meta < 60) metaColor = '#a7c957';
  if (meta >= 60 && meta < 80) metaColor = '#70e000';
  if (meta >= 80 && meta < 90) metaColor = '#38b000';
  if (meta >= 90 && meta <= 100) metaColor = '#028fde';

  return (
    <Link className={classes.card} to={`/app/${props.id}`}>
      <img alt="" src={props.url} />
      <div className={classes.description}>
        <p>{props.name}</p>
        <span
          style={
            metaColor ? { background: metaColor } : { background: '#6c757d' }
          }
        >
          {props.metacritic ? props.metacritic : 0}
        </span>
      </div>
    </Link>
  );
};

export default GameCard;
