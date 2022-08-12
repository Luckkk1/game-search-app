import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import GameForum from './pages/GameForum';
import GameBrowse from './pages/GameBrowse';
import GameDetail from './pages/GameDetail';
import GameForumCont from './pages/GameForumCont';
import Layout from './components/Layout/Layout';
import Intro from './pages/Intro';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path={'*'} element={<Navigate to={'/home'} />} />
        <Route path={'/home'} element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/regi'} element={<Register />} />
        <Route path={'/file'} element={<Profile />} />
        <Route path={'/forum'} element={<GameForum />} />
        <Route path={'/forum/:contId'} element={<GameForumCont />} />
        <Route path={'/browse'} element={<GameBrowse />} />
        <Route path={'/app/:gameId'} element={<GameDetail />} />
      </Routes>
    </Layout>
  );
};

export default App;
