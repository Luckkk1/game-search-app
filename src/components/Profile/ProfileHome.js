import classes from './ProfileHome.module.css';

import ProfileMeta from './ProfileMeta';

const ProfileHome = () => {
  return (
    <main className={classes.main}>
      <ProfileMeta />
    </main>
  );
};

export default ProfileHome;
