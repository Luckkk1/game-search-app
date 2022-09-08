import { Fragment } from 'react';
import ReactDom from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = props => {
  return (
    <div className={`${classes.modal} ${props.className}`}>
      {props.children}
    </div>
  );
};

const Modal = props => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <ModalOverlay className={classes.modal}>{props.children}</ModalOverlay>,
        document.querySelector('#overlay')
      )}
      {ReactDom.createPortal(
        <Backdrop onClick={props.onClick} />,
        document.querySelector('#overlay')
      )}
    </Fragment>
  );
};

export default Modal;
