import classes from './GameCard.module.css';

const GameCard = props => {
  let meta = props.metacritic;
  let metaColor;
  if (meta >= 0 && meta < 40) metaColor = '#6c757d';
  if (meta >= 40 && meta < 60) metaColor = '#a7c957';
  if (meta >= 60 && meta < 80) metaColor = '#70e000';
  if (meta >= 80 && meta < 90) metaColor = '#38b000';
  if (meta >= 90 && meta <= 100) metaColor = '#028fde';

  return (
    <div className={classes.card}>
      <img src={props.url} alt="" />
      <div className={classes.description}>
        <p>{props.name}</p>
        <span style={{ background: metaColor }}>{props.metacritic}</span>
      </div>
    </div>
  );
};

export default GameCard;
