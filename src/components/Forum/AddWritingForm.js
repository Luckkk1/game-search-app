import classes from './AddWritingForm.module.css';

const AddWritingForm = () => {
  return (
    <form className={classes.writeForm}>
      <div className={classes.inputControl}>
        <p>Title</p>
        <input type="text" name="title" />
      </div>
      <div className={classes.inputControl}>
        <p>Text</p>
        <textarea name="content" cols="30" rows="10"></textarea>
      </div>
      <button>Submit</button>
    </form>
  );
};

export default AddWritingForm;
