import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { Suspense } from 'react';

import Layout from './components/Layout/Layout';
import ScrollToTop from './pages/ScrollToTop';
import { authActions } from './store/auth';
import LoadingSpinner from './components/UI/LoadingSpinner';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Profile = React.lazy(() => import('./pages/Profile'));
const GameForum = React.lazy(() => import('./pages/GameForum'));
const Game_Browse = React.lazy(() => import('./pages/Game_Browse'));
const Game_Detail = React.lazy(() => import('./pages/Game_Detail'));
const GameForumCont = React.lazy(() => import('./pages/GameForumCont'));
const Intro = React.lazy(() => import('./pages/Intro'));

const App = () => {
  const dispatch = useDispatch();
  dispatch(authActions.checkLoggedInState());

  return (
    <Suspense
      fallback={
        <div className="centered">
          <LoadingSpinner />
        </div>
      }
    >
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
    </Suspense>
  );
};

export default App;
