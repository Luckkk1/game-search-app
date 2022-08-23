import classes from './ProfileSide.module.css';

const ProfileSide = () => {
  return (
    <section className={classes.section}>
      <ul className={classes.sideBar}>
        <li>닉네임 변경</li>
        <li>비밀번호 변경</li>
      </ul>
    </section>
  );
};

export default ProfileSide;
