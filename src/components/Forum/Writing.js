import classes from './Writing.module.css';

const Writing = props => {
  const dataset = props.data;

  return (
    <div className={classes.writing}>
      <p className={classes.textNum}>{dataset.textId}</p>
      <p className={classes.title}>{dataset.title}</p>
      <p className={classes.nick}>{dataset.nick}</p>
      <p className={classes.date}>{dataset.date}</p>
    </div>
  );
};

export default Writing;
