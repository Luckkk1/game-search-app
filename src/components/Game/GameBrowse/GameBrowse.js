import { useLocation } from 'react-router-dom';

import BrowseList from './BrowseList';
import classes from './GameBrowse.module.css';

const GameBrowse = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get('sort');
  return (
    <main className={classes.main}>
      <h2>{title}</h2>
      <BrowseList sort={title} />
    </main>
  );
};

export default GameBrowse;
