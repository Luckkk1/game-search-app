import { Link } from 'react-router-dom';

import metaImg from '../../asset/oasis.jpeg';
import classes from './ProfileMeta.module.css';

const ProfileMeta = () => {
  return (
    <section className={classes.section}>
      <div className={classes.meta}>
        <img src={metaImg} alt="" />
        <h3>닉네임</h3>
      </div>
      <div className={classes.recent}>
        <h4>최근 게시물</h4>
        <ul className={classes.ul}>
          <li>
            <Link to={'/'}>안녕하세요 잘 부탁 드립니다.</Link>
          </li>
          <li>
            <Link to={'/'}>게임 추천좀 해주세요</Link>
          </li>
          <li>
            <Link to={'/'}>이 게임 재밌나요?</Link>
          </li>
          <li>
            <Link to={'/'}>이 게임 재밌나요?</Link>
          </li>
          <li>
            <Link to={'/'}>이 게임 재밌나요?</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProfileMeta;
