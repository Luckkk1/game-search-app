import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import GameForum from './pages/GameForum';
import Game_Browse from './pages/Game_Browse';
import Game_Detail from './pages/Game_Detail';
import GameForumCont from './pages/GameForumCont';
import Layout from './components/Layout/Layout';
import Intro from './pages/Intro';
import ScrollToTop from './pages/ScrollToTop';
import { authActions } from './store/auth';

const App = () => {
  const dispatch = useDispatch();
  dispatch(authActions.checkLoggedInState());

  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path={'*'} element={<Navigate to={'/home'} />} />
        <Route path={'/home'} element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/regi'} element={<Register />} />
        <Route path={'/file'} element={<Profile />} />
        <Route path={'/forum'} element={<GameForum />} />
        <Route path={'/forum/:contId'} element={<GameForumCont />} />
        <Route path={'/browse/*'} element={<Game_Browse />} />
        <Route path={'/app/:gameId'} element={<Game_Detail />} />
      </Routes>
    </Layout>
  );
};

export default App;
