import { Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = props => {
  return (
    <Fragment>
      <Header />
      <Fragment>{props.children}</Fragment>
      <Footer />
    </Fragment>
  );
};

export default Layout;
