import classes from './ProfileHome.module.css';
import ProfileMeta from './ProfileMeta';
import ProfileLibrary from './ProfileLibrary';
import ProfilePassword from './ProfilePassword';

const ProfileHome = () => {
  return (
    <main className={classes.main}>
      <ProfilePassword />
      <ProfileMeta />
      <ProfileLibrary />
    </main>
  );
};

export default ProfileHome;
