import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

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
const AddGameForum = React.lazy(() => import('./pages/AddGameForum'));
const Intro = React.lazy(() => import('./pages/Intro'));

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(authActions.checkLoggedInState());
  }, []);

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
          {!isLoggedIn && <Route path={'/login'} element={<Login />} />}
          {!isLoggedIn && <Route path={'/regi'} element={<Register />} />}
          {isLoggedIn && <Route path={'/profile'} element={<Profile />} />}
          <Route path={'/forum'} element={<GameForum />} />
          <Route path={'/forum/:contId'} element={<GameForumCont />} />
          <Route path={'/forum/add'} element={<AddGameForum />} />
          <Route path={'/browse/*'} element={<Game_Browse />} />
          <Route path={'/app/:gameId'} element={<Game_Detail />} />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;
