import SearchBar from '../UI/SeachBar';
import classes from './MainHome.module.css';

const MainHome = () => {
  return (
    <main>
      <section>
        <SearchBar className={classes.search} link="search" />
      </section>
    </main>
  );
};

export default MainHome;
