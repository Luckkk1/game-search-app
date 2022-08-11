import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import classes from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={classes.aside}>
      <NavLink to={'/intro'}>소개</NavLink>
      <NavLink to={'/search'}>탐색</NavLink>
      <NavLink to={'/forum'}>게시판</NavLink>
      <a href="https://github.com/Luckkk1/game-search-app" target="blank">
        <FontAwesomeIcon icon={faGithub} className={classes.icon} />
      </a>
    </aside>
  );
};

export default Sidebar;
