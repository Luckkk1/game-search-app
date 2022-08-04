import { NavLink } from 'react-router-dom';

import classes from './SidebarA.module.css';

const SidebarA = () => {
  return (
    <aside className={classes.aside}>
      <NavLink
        className={navData => (navData.isActive ? classes.active : '')}
        to={'/list?order=all'}
      >
        All
      </NavLink>
      <NavLink
        className={navData => (navData.isActive ? classes.active : '')}
        to={'/list?order=reco'}
      >
        추천게임
      </NavLink>
      <NavLink
        className={navData => (navData.isActive ? classes.active : '')}
        to={'/list?order=latest'}
      >
        최신게임
      </NavLink>
      <NavLink
        className={navData => (navData.isActive ? classes.active : '')}
        to={'/forum'}
      >
        게시판
      </NavLink>
    </aside>
  );
};

export default SidebarA;
