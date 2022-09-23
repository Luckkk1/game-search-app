import { useNavigate } from 'react-router-dom';

import classes from './AddWriting.module.css';
import AddWritingForm from './AddWritingForm';

const AddWriting = () => {
  const navigate = useNavigate();

  const goBackClickHandler = () => {
    navigate(-1);
  };

  return (
    <section className={classes.addWriting}>
      <div className={classes.header}>
        <h2>Share your thoughts</h2>
        <button onClick={goBackClickHandler}>Go Back</button>
      </div>
      <AddWritingForm />
    </section>
  );
};

export default AddWriting;
