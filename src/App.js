import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import GameForum from './pages/GameForum';
import GameList from './pages/GameList';
import GameDetail from './pages/GameDetail';
import GameForumCont from './pages/GameForumCont';
import Layout from './components/Layout/Layout';
import GameSearch from './pages/GameSearch';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path={'*'} element={<Navigate to={'/home'} />} />
        <Route path={'/home'} element={<Home />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/regi'} element={<Register />} />
        <Route path={'/file'} element={<Profile />} />
        <Route path={'/forum'} element={<GameForum />} />
        <Route path={'/forum/:contId'} element={<GameForumCont />} />
        <Route path={'/list'} element={<GameList />} />
        <Route path={'/search'} element={<GameSearch />} />
        <Route path={'/app/:gameId'} element={<GameDetail />} />
      </Routes>
    </Layout>
  );
};

export default App;
