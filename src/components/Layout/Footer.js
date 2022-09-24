import { Link } from 'react-router-dom';

import classes from './Footer.module.css';
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.left}>
        <Link to={'/'}>
          <h2>Game Bot</h2>
        </Link>
      </div>
      <div className={classes.middle}>
        <ul>
          <li>
            <Link to={'/intro'}>Introduce</Link>
          </li>
          <li>
            <Link to={'/browse?sort=Hot%20Games&page=1'}>Game Browse</Link>
          </li>
          <li>
            <Link to={'/forum?page=1'}>Forum</Link>
          </li>
        </ul>
      </div>
      <div className={classes.right}>
        <ul>
          <li>
            <a href="https://fcscode.tistory.com/" target="blank">
              Blog
            </a>
          </li>
          <li>
            <a href="https://github.com/Luckkk1/game-search-app" target="blank">
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
