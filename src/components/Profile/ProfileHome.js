import classes from './ProfileHome.module.css';

import ProfileMeta from './ProfileMeta';
import GameList from '../UI/GameList';
import ProfileSide from './ProfileSide';

const ProfileHome = () => {
  return (
    <main className={classes.main}>
      <ProfileSide />
      <ProfileMeta />
      <GameList listName="라이브러리" />
    </main>
  );
};

export default ProfileHome;
