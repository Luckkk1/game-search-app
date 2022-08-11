import { Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = props => {
  return (
    <Fragment>
      <Header />
      <div className="container">{props.children}</div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
