import { Fragment } from 'react';
import Header from './Header';
import SidebarA from './SidebarA';

const Layout = props => {
  return (
    <Fragment>
      <Header />
      <SidebarA />
      <div className="container">
        <main>{props.children}</main>
      </div>
    </Fragment>
  );
};

export default Layout;
