import classes from './ProfileHome.module.css';
import ProfileMeta from './ProfileMeta';
import ProfileSide from './ProfileSide';
import ProfileLibrary from './ProfileLibrary';

const ProfileHome = () => {
  return (
    <main className={classes.main}>
      <ProfileSide />
      <ProfileMeta />
      <ProfileLibrary />
    </main>
  );
};

export default ProfileHome;
