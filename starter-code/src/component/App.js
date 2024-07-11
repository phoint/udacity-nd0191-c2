import React from 'react';
import '../App.css';
import { useDispatch, useSelector} from 'react-redux'
import { useEffect, Fragment, useRef } from 'react';
import { Dashboard } from './DashBoard';
import { fetchQuestions } from '../features/questions/questionSlice';
import { fetchUser } from '../features/users/userSlice';
import { Poll } from './Poll';
import { LoadingStatus } from '../app/util';
import { NewQuestion } from './NewQuestion';
import { Leaderboard } from './Leaderboard';
import LoadingBar from 'react-top-loading-bar';
import { Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import Login from './Login';
import NotFound from './NotFound';
import Protected from './Protected';

function App() {
  const dispatch = useDispatch()
  const loadingUser = useSelector(state => state.users.status)
  const ref = useRef(null)
  useEffect(() => {
    ref.current.continuousStart();
    handleInitialData(dispatch);
  }
  ,[dispatch])

  const handleInitialData = (dispatch) => {
      dispatch(fetchQuestions());
      dispatch(fetchUser());
      ref.current.complete();
  }

  return (
    <div className='container'>
      <Fragment>
        <LoadingBar color="#f11946" ref={ref} shadow="true" />
        {loadingUser === LoadingStatus.SUCCESS && <Nav />}
        <Routes>
          <Route path="/" exact element={
            <Protected>
              <Dashboard />
            </Protected>
          } />
          <Route path="/question/:id" exact element={
            <Protected>
              <Poll />
            </Protected>
          } />
          <Route path="/add" exact element={
            <Protected>
              <NewQuestion />
            </Protected>
          } />
          <Route path="/leaderboard" exact element={
            <Protected>
              <Leaderboard />
            </Protected>
          } />
          <Route path="*" exact element={
            <Protected>
              <NotFound />
            </Protected>
          } />
          <Route path='/login' exact element={<Login />} />
        </Routes>
      </Fragment>
    </div>
  );
}

export default App;