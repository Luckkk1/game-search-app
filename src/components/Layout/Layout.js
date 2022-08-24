import { Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = props => {
  return (
    <Fragment>
      <Header />
      <div className="wrapper">
        <Fragment>{props.children}</Fragment>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
