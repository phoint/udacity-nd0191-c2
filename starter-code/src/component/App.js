import logo from '../logo.svg';
import '../App.css';
import { useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import { Dashboard } from './DashBoard';
import { fetchQuestions } from '../features/questions/questionSlice';
import { login } from '../features/authedUser/authedUserSlice';
import { fetchUser } from '../features/users/userSlice';
import { Poll } from './Poll';
import { LoadingStatus } from '../app/util';
import { NewQuestion } from './NewQuestion';
import { Leaderboard } from './Leaderboard';

function App() {
  const dispatch = useDispatch()
  const loadingQuestion = useSelector(state => state.questions.status)
  const loadingUser = useSelector(state => state.users.status)
  const authedUser = useSelector(state => state.authedUser.id)
  useEffect(() => {
    handleInitialData(dispatch);
  }
  ,[dispatch])

  const handleInitialData = (dispatch) => {
      dispatch(login({
        id:"sarahedo",
        name:"Sarah Edo"
      }));
      dispatch(fetchQuestions());
      dispatch(fetchUser());
  }

  return (
    <div className="App">
      {loadingQuestion === LoadingStatus.SUCCESS && <Dashboard/>}
      {/* {loadingUser === LoadingStatus.SUCCESS && <Poll id="8xf0y6ziyjabvozdd253nd"/>} */}
      { authedUser && <NewQuestion/>}
      {loadingUser === LoadingStatus.SUCCESS && <Leaderboard/>}
    </div>
  );
}

export default App;