import classes from './ProfileHome.module.css';
import ProfileMeta from './ProfileMeta';
import ProfileLibrary from './ProfileLibrary';

const ProfileHome = () => {
  return (
    <main className={classes.main}>
      <ProfileMeta />
      <ProfileLibrary />
    </main>
  );
};

export default ProfileHome;
